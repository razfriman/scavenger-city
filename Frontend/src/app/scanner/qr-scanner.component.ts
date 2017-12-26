import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { QRCode } from './qrdecode/qrcode';
import { NoInputDeviceError } from 'app/scanner/qrdecode/no-input-device-error';
import { BrowserQRCodeReader } from 'app/scanner/zxing-typescript/browser/BrowserQRCodeReader';

/**
 * QrScanner will scan for a QRCode from your Web-cam and return its
 * string representation by drawing the captured image onto a 2D Canvas
 * and use LazarSoft/jsqrcode to check for a valid QRCode every 500ms
 *
 * @usage:
 * <qr-scanner
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
    ':host video {height: auto; width: 100%;}',
    ':host canvas {display: block; height: 500px; width: 500px;}'
  ],
  template: `
        <ng-container>
          <canvas #qrCanvas hidden="true" width="500" height="500"></canvas>
          <div #videoWrapper></div>
        </ng-container>`
})
export class QrScannerComponent implements OnInit, OnDestroy, AfterViewInit {

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
  canvasWidth = 500;
  canvasHeight = 500;

  constructor(private renderer: Renderer2, private element: ElementRef) {
    this.nativeElement = this.element.nativeElement;

    // const codeReader = new BrowserQRCodeReader();

    // codeReader.decodeFromInputVideoDevice(undefined, 'video')
    //   .then((result) => {
    //     console.log('ZXing');
    //     console.log(result);
    //   }).catch((err) => {
    //     console.error(err);
    //   });
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

  private initCanvas(): void {
    console.log(this.canvasWidth);
    console.log(this.canvasHeight);

    this.gCtx = this.qrCanvas.nativeElement.getContext('2d');
    this.gCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.gCtx.translate(1, -1);
  }

  private connectDevice(): void {

    const self = this;

    function success(stream: MediaStream): void {
      self.stream = stream;
      self.videoElement.srcObject = stream;
      self.gUM = true;

      self.videoElement.onloadedmetadata = () => {
        self.canvasWidth = self.videoElement.videoWidth;
        self.canvasHeight = self.videoElement.videoHeight;
        self.initCanvas();
        self.captureTimeout = setTimeout(captureToCanvas, self.updateTime);
      };
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

    this.renderer.appendChild(this.videoWrapper.nativeElement, this.videoElement);

    const md = window.navigator.mediaDevices;
    md.getUserMedia({
      audio: false,
      video: {
        facingMode: 'environment'
      }
    })
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
    this.qrCode = new QRCode();
    this.qrCode.myCallback = (decoded: string) => this.decodeCallback(decoded);
    this.connectDevice();
  }
}
