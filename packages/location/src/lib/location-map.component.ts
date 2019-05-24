import { Component, EventEmitter, Input, Output } from '@angular/core';

/** Shows Google Maps Map */
@Component({
  selector: 'ec-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss'],
})
export class LocationMapComponent {
  /** The desired map center */
  @Input() center: { longitude: any; latitude: any } = { latitude: 48.8093253, longitude: 9.159388100000001 };
  /** If true, no markers can be changed or set */
  @Input() readOnly: boolean;
  /** If true, no marker can be chaned */
  @Input() disabled: boolean;
  /** Emits when the marker has been changed */
  @Output() changed: EventEmitter<any> = new EventEmitter();
  /** Form input component */
  @Input() value: {
    longitude: number;
    latitude: number;
  };

  /** sets the value cand changes the center */
  setValue(value) {
    if (this.disabled) {
      console.warn('cannot change map value: disabled!');
      return;
    }
    this.value = value;
    if (value) {
      this.center = value;
    }
  }
  /** changes value on marker dragend */
  markerDragEnd(coords) {
    if (!coords) {
      console.warn('no coords');
      return;
    }
    if (this.disabled) {
      return;
    }
    const position = { longitude: coords.lng, latitude: coords.lat };
    this.setValue(position);
    this.changed.emit(position);
  }
}
