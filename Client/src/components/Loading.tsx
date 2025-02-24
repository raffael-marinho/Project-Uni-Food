import { ClipLoader } from "react-spinners";

const Loading = ({ size = 50, color = "primary" }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loading;
