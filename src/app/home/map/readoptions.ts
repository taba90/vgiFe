import Map from 'ol/map';
import Projection from 'ol/proj/Projection';

export class ReadOptions {

    dataProjection: Projection;
    featureProjection: Projection;

    constructor(map: Map) {
        this.dataProjection = map.getView().getProjection();
        this.featureProjection = map.getView().getProjection();
    }
}
