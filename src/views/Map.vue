<template>
  <div id="map" />
</template>

<script>
import "ol/ol.css";

import Map from "ol/Map";
import View from "ol/View";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import {
  defaults as defaultInteractions,
  DragRotateAndZoom
} from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Cluster } from "ol/source";

import { fromLonLat } from "ol/proj";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import { Icon, Style, Text, Fill, Stroke } from "ol/style";
import { Select } from "ol/interaction";

import axios from "axios";

const fetchPhotos = async () => {
  const response = await axios.get("https://wfc-2019.firebaseapp.com/images/", {
    params: {
      limit: 200
    }
  });

  return await response.data.data.images.map(v => {
    return {
      src: v.url,
      location: v.location,
      id: v.id,
      title: v.title,
      caption: v.description,
      postDatetime: v.postDatetime,
      width: v.width,
      height: v.height
    };
  });
};

export default {
  data() {
    return {
      map: null
    };
  },
  watch: {
    map: function() {
      this.addPoint();
    }
  },
  methods: {
    addPoint: async function() {
      const data = await fetchPhotos();

      const iconFeatures = [];

      await data.forEach(v => {
        iconFeatures.push(
          new Feature({
            geometry: new Point(
              fromLonLat([Number(v.location.lng), Number(v.location.lat)])
            ),
            ...v
          })
        );
      });

      const vectorSource = await new VectorSource({ features: iconFeatures });
      const clusterSource = await new Cluster({
        distance: 50,
        source: vectorSource
      });

      const clusters = await new VectorLayer({
        source: clusterSource,
        style: function(feature) {
          const size = feature.get("features").length;
          const src = feature.get("features")[0].get("src");

          return new Style({
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src,
              scale: 0.12
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: "#fff"
              }),
              scale: 1.5,
              offsetX: 30,
              backgroundStroke: new Stroke({
                color: [234, 88, 73, 0.8],
                width: 20
              })
            })
          });
        }
      });

      this.map.addLayer(clusters);
    }
  },
  mounted() {
    const view = new View({
      center: [0, 0],
      zoom: 2
    });

    const selectClick = new Select();

    selectClick.on("select", e => {
      const id = e.selected[0].values_.features[0].get("id");
      this.$router.push(`/detail/${id}/`);
    });

    const interactions = defaultInteractions().extend([
      new DragRotateAndZoom(),
      selectClick
    ]);

    const controls = defaultControls().extend([new ScaleLine()]);

    const layers = [
      new TileLayer({
        title: "OSM",
        type: "base",
        visible: true,
        source: new OSM()
      })
    ];

    const map = new Map({
      target: "map",
      interactions,
      controls,
      layers,
      view
    });

    this.map = map;
  }
};
</script>
