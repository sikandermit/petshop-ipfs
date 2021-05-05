import React from "react";
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loader-div">
      <div className="loader">
        <Loader
          type="Puff"
          color="red"
          height={100}
          width={100}
          // timeout={3000} //3 secs
        />
      </div>
    </div>
  );
};

export default Loading;
