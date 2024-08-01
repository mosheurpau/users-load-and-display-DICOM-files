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
    const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

    cornerstone.loadImage(imageId).then((image) => {
      cornerstone.displayImage(dicomImageElement.current, image);
    });
  };

  return (
    <div>
      <div className="my-5">
        <input
          className="file-input file-input-sm file-input-bordered file-input-success w-full max-w-xs"
          type="file"
          accept=".dcm"
          onChange={handleFileChange}
        />
      </div>
      <div
        className="border-4 shadow-2xl"
        ref={dicomImageElement}
        style={{ width: "512px", height: "512px", background: "black" }}
      ></div>
    </div>
  );
}

export default DicomViewer;
