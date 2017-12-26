import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BrowserQRCodeReaderExt } from './browser-qr-code-reader-ext';

@Component({
  selector: 'app-ngx-zxing',
  template: `
      <div class="form">
          <video class="{{cssClass}}" id="preview" #preview></video>
      </div>`
})
export class NgxZxingComponent implements AfterViewInit, OnDestroy, OnChanges {

  private destroyed$: Subject<any> = new Subject<any>();
  private codeReader = new BrowserQRCodeReaderExt(1500);
  private deviceId: string;

  @ViewChild('preview')
  previewElem: ElementRef;

  @Input()
  start = false;

  @Input()
  device: any;

  @Input()
  cssClass: string;

  @Output()
  scanCompleted = new EventEmitter<string>();

  @Output()
  camsFound = new EventEmitter<MediaDeviceInfo[]>();

  constructor() {
    if (!window.navigator.mediaDevices || !window.navigator.mediaDevices.enumerateDevices) {
      console.error('Can\'t access mediaDevices API');
      return;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.start || changes.device) && this.device) {
      this.stopCam();
      this.deviceId = this.device.deviceId;
      if (this.start) {
        this.startCam();
      }
    }
  }

  ngAfterViewInit() {
    // iOS 11 Fix
    this.previewElem.nativeElement.setAttribute('autoplay', true);
    this.previewElem.nativeElement.setAttribute('muted', true);
    this.previewElem.nativeElement.setAttribute('playsinline', true);
    this.previewElem.nativeElement.setAttribute('autofocus', true);

    this.enumerateCams();

    if (this.start) {
      this.startCam();
    }
  }

  ngOnDestroy() {
    this.stopCam();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  enumerateCams() {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(
      stream => {
        window.navigator.mediaDevices.enumerateDevices().then(devices => {
          const videoDevices = devices.filter(x => x.kind === 'videoinput');
          this.camsFound.next(devices);
          this.deviceId = devices[0].deviceId;

          // Start stream so Browser can display permission-dialog ("Website wants to access your camera, allow?")
          this.previewElem.nativeElement.srcObject = stream;
          // After permission was granted, we can stop it again
          stream.getVideoTracks().forEach(track => {
            track.stop();
          });
          stream.getAudioTracks().forEach(track => {
            track.stop();
          });
        });
      }).catch(error => {
        console.error(error);
      });
  }

  startCam() {
    this.scan(this.deviceId);
  }

  scan(deviceId: string) {
    this.codeReader.decodeFromInputVideoDevice((result: any) => {
      this.scanSuccess(result);
    }, deviceId, this.previewElem.nativeElement);
  }

  stopCam() {
    this.codeReader.reset();
  }

  scanSuccess(result: any) {
    if (this.start) {
      this.scanCompleted.next(result.text);
    }
  }
}
