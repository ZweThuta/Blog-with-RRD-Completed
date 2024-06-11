import React from "react";

const Loader = () => {
  return (
    <section className="lds-bg">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default Loader;
