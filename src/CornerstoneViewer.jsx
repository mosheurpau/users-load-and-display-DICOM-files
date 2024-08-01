import { useEffect, useRef } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

function DicomViewer() {
  const dicomImageElement = useRef(null);

  useEffect(() => {
    cornerstone.enable(dicomImageElement.current);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

      cornerstone.loadImage(imageId).then((image) => {
        cornerstone.displayImage(dicomImageElement.current, image);
      });
    }
  };

  const handleZoomIn = () => {
    const viewport = cornerstone.getViewport(dicomImageElement.current);
    viewport.scale += 0.1;
    cornerstone.setViewport(dicomImageElement.current, viewport);
  };

  const handleZoomOut = () => {
    const viewport = cornerstone.getViewport(dicomImageElement.current);
    viewport.scale -= 0.1;
    cornerstone.setViewport(dicomImageElement.current, viewport);
  };

  const handleRandomZoom = () => {
    const viewport = cornerstone.getViewport(dicomImageElement.current);
    viewport.scale = Math.random() * 2;
    cornerstone.setViewport(dicomImageElement.current, viewport);
  };

  const handleRotateDelta = () => {
    const viewport = cornerstone.getViewport(dicomImageElement.current);
    viewport.rotation += 30;
    cornerstone.setViewport(dicomImageElement.current, viewport);
  };

  const handleInvert = () => {
    const viewport = cornerstone.getViewport(dicomImageElement.current);
    viewport.invert = !viewport.invert;
    cornerstone.setViewport(dicomImageElement.current, viewport);
  };

  const handleResetViewport = () => {
    const image = cornerstone.getImage(dicomImageElement.current);
    const defaultViewport = cornerstone.getDefaultViewportForImage(
      dicomImageElement.current,
      image
    );
    cornerstone.setViewport(dicomImageElement.current, defaultViewport);
  };

  return (
    <div className="  text-center">
      <input
        className="file-input file-input-bordered file-input-success w-full max-w-xs file-input-sm my-2"
        type="file"
        accept=".dcm"
        onChange={handleFileChange}
      />{" "}
      <div className="bg-slate-800">
        <div
          ref={dicomImageElement}
          style={{ width: "512px", height: "512px", background: "black" }}
        ></div>
        <div className="mt-5 text-center ">
          <button
            className="btn btn-outline btn-success btn-sm"
            onClick={handleZoomIn}
          >
            Zoom In
          </button>
          <button
            className="btn btn-outline btn-success btn-sm"
            onClick={handleZoomOut}
            style={{ marginLeft: "10px" }}
          >
            Zoom Out
          </button>
          <button
            className="btn btn-outline btn-success btn-sm"
            onClick={handleRandomZoom}
            style={{ marginLeft: "10px" }}
          >
            Random Zoom
          </button>
        </div>

        <div className="mt-2 text-center">
          <button
            className="btn btn-outline btn-success btn-sm mb-5"
            onClick={handleRotateDelta}
            style={{ marginLeft: "10px" }}
          >
            Rotate Delta 30
          </button>
          <button
            className="btn btn-outline btn-success btn-sm"
            onClick={handleInvert}
            style={{ marginLeft: "10px" }}
          >
            Invert
          </button>
          <button
            className="btn btn-outline btn-success btn-sm"
            onClick={handleResetViewport}
            style={{ marginLeft: "10px" }}
          >
            Reset Viewport
          </button>
        </div>
      </div>
    </div>
  );
}

export default DicomViewer;
