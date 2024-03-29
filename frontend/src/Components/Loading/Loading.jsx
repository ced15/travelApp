import "./Loading.css";

const Loading = () => (
  <div className=" flex relative justify-center w-full h-screen items-center">
      <img src='images/loadingbk.jpg' className="w-full h-screen brightness-75" />
      <img
        className="absolute w-106 h-86 justify-center"
        src="images/myRaccoon.gif"
      />
  </div>
);

export default Loading;
