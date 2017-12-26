import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { QRCode } from './qrdecode/qrcode';
import { NoInputDeviceError } from 'app/scanner/qrdecode/no-input-device-error';

/**
 * QrScanner will scan for a QRCode from your Web-cam and return its
 * string representation by drawing the captured image onto a 2D Canvas
 * and use LazarSoft/jsqrcode to check for a valid QRCode every 500ms
 *
 * @usage:
 * <qr-scanner
 *     [canvasWidth]="640"      canvas width                                 (default: 640)
 *     [canvasHeight]="480"     canvas height                                (default: 480)
 *     [stopAfterScan]="true"   should the scanner stop after first success? (default: true)
 *     [updateTime]="500"       miliseconds between new capture              (default: 500)
 *     (readCompleted)="decodedOutput(string)" </qr-scanner>
 *
 * @public
 * startScanning() {void}       Method called by ngInit to find devices and start scanning.
 * stopScanning() {void}        Method called by ngDestroy (or on successful qr-scan) to stop scanning
 *
 * Both of these methods can be called to control the scanner if `stopAfterScan` is set to `false`
 */
@Component({
  moduleId: 'module.id',
  selector: 'app-qr-scanner',
  styles: [
    ':host video {height: auto; width: 100%;}'
  ],
  template: `
        <ng-container>
          <canvas #qrCanvas [width]="canvasWidth" [height]="canvasHeight" hidden="true"></canvas>
          <div #videoWrapper></div>
        </ng-container>`
})
export class QrScannerComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() canvasWidth = 640;
  @Input() canvasHeight = 480;
  @Input() stopAfterScan = true;
  @Input() updateTime = 500;

  @Output() readCompleted: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('videoWrapper') videoWrapper: ElementRef;
  @ViewChild('qrCanvas') qrCanvas: ElementRef;

  gCtx: CanvasRenderingContext2D;
  qrCode: QRCode = null;
  isDeviceConnected = false;
  gUM = false;
  videoElement: HTMLVideoElement;
  stream: MediaStream;
  stop = false;
  nativeElement: ElementRef;

  captureTimeout: any;

  constructor(private renderer: Renderer2, private element: ElementRef) {
    this.nativeElement = this.element.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.load();
  }

  ngOnDestroy() {
    this.stopScanning();
  }

  startScanning(): void {
    this.load();
  }

  stopScanning(): void {

    if (this.captureTimeout) {
      clearTimeout(this.captureTimeout);
      this.captureTimeout = false;
    }

    this.stream.getTracks()[0].stop();
    this.stop = true;
  }

  private initCanvas(w: number, h: number): void {
    this.qrCanvas.nativeElement.style.width = `${w}px`;
    this.qrCanvas.nativeElement.style.height = `${h}px`;
    this.gCtx = this.qrCanvas.nativeElement.getContext('2d');
    this.gCtx.clearRect(0, 0, w, h);
    // this.gCtx.translate(-1, 1);
  }

  private connectDevice(): void {

    const self = this;

    function success(stream: MediaStream): void {
      self.stream = stream;
      self.videoElement.srcObject = stream;
      self.gUM = true;
      self.captureTimeout = setTimeout(captureToCanvas, self.updateTime);
    }

    function error(error1: any): void {
      self.gUM = false;
      return;
    }

    function captureToCanvas(): void {
      if (self.stop || !self.isDeviceConnected) {
        return;
      }

      if (self.gUM) {
        try {
          self.gCtx.drawImage(self.videoElement, 0, 0, self.canvasWidth, self.canvasHeight);
          self.qrCode.decode(self.qrCanvas.nativeElement);
        } catch (e) {
          self.captureTimeout = setTimeout(captureToCanvas, self.updateTime);
        }
      }
    }

    if (this.isDeviceConnected && !this.captureTimeout) {
      this.captureTimeout = setTimeout(captureToCanvas, this.updateTime);
      return;
    }

    this.videoElement = this.renderer.createElement('video');
    this.videoElement.setAttribute('autoplay', 'true');

    // Hack for safari
    this.videoElement.setAttribute('playsinline', 'true');
    // this.videoElement.setAttribute('controls', 'true');
    // setTimeout(() => {
    //   this.videoElement.removeAttribute('controls');
    // });

    this.renderer.appendChild(this.videoWrapper.nativeElement, this.videoElement);

    const md = window.navigator.mediaDevices;
    md.getUserMedia({ audio: false, video: { facingMode: 'environment' } })
      .then(success)
      .catch(error);

    this.isDeviceConnected = true;
    this.captureTimeout = setTimeout(captureToCanvas, this.updateTime);
  }

  private decodeCallback(decoded: string) {
    this.readCompleted.emit(decoded);

    if (this.stopAfterScan) {
      this.stopScanning();
    }
  }

  private load(): void {
    this.stop = false;
    this.isDeviceConnected = false;
    this.initCanvas(this.canvasHeight, this.canvasWidth);
    this.qrCode = new QRCode();
    this.qrCode.myCallback = (decoded: string) => this.decodeCallback(decoded);
    this.connectDevice();
  }
}
