import IconsByName from "components/iconsByName";
import { useTheme } from "context/themeContext";
import CapParagraph from "./capParagraph";
import CapTextShowData from "./capTextShowData";

export default function CapResponse({
  type = "loading",
  dimensions = "0 0 270 97",
  color = "#7dc523",
  sWidth = "1",
  height = "auto",
  titles = [],
  descriptions = [],
}: {
  type?: string;
  dimensions?: string;
  color?: string;
  sWidth?: string;
  height?: string;
  titles?: string[];
  descriptions?: string[];
}) {
  const theme = useTheme();

  return (
    <>
      {type === "loading" ? (
        <div className="flex justify-center">
          <div className="svgWrapper">
            <svg viewBox={dimensions} height={height}>
              <g stroke="none" stroke-width={sWidth} fill-rule="evenodd">
                <path
                  className="path"
                  d="m 210.0062,9.6840304 c -1.795,0.4439996 -1.663,-1.0770001 -1.893,21.8429996 -0.313,31.278 -0.311,31.745 0.146,33.814 5.053,22.863 32.006,31.114003 48.294,14.784 13.874,-13.909 9.725,-37.385 -8.098,-45.825 -5.08,-2.405 -7.566,-2.765 -19.162,-2.772 -8.151,-0.006 -8.073,0.002 -8.734,-0.888 -0.342,-0.46 -0.351,-0.67 -0.453,-9.86 -0.116,-10.417 -0.109,-10.359 -1.229,-10.9189996 -0.562,-0.281 -7.863,-0.427 -8.871,-0.177 M 109.8662,28.61703 c -13.461002,1.966 -21.243002,13.725 -16.818002,25.414 2.718,7.179 7.848002,9.535 22.495002,10.334 7.019,0.383 8.174,0.634 9.623,2.088 2.495,2.505 1.624,7.411 -1.596,8.985 -1.921,0.939 -6.44,1.534 -10.36,1.364 -5.462,-0.236 -9.335,-1.851 -14.010002,-5.84 -2.506,-2.138 -2.772,-2.05 -7.295,2.392 -4.557,4.476 -4.717,5.055 -2.027,7.348 9.969,8.501003 26.846002,11.921003 37.357002,7.569 11.816,-4.891 15.547,-19.424 7.792,-30.353 -2.671,-3.763 -4.49,-4.379 -13.484,-4.564 -8.514,-0.176 -11.191,-0.606 -14.645,-2.356 -4.473,-2.266 -3.863,-7.988 1.106,-10.372 5.235,-2.513 10.735,-1.649 18.174,2.854 3.056,1.85 3.112,1.832 6.755,-2.215 4.285,-4.759 4.319,-5.125 0.694,-7.354 -7.063,-4.34 -16.259,-6.389 -23.761,-5.294 m -77.739001,2.348 c -15.233,1.838 -26.9249999,16.586 -25.0899999,31.646 2.9789999,24.436 31.9039999,34.729003 49.1799999,17.501 4.846,-4.832 4.836,-5.102 -0.341,-9.946 -4.756,-4.448 -4.737,-4.446 -7.558,-0.947 -8.578,10.642 -26.569,5.696 -28.371,-7.8 -2.209,-16.536 18.614,-25.135 28.867,-11.921 2.213,2.851 2.446,2.783 6.72,-1.984 3.998,-4.459 4.047,-4.67 1.699,-7.376 -3.499,-4.034 -9.453,-7.426 -15.44,-8.796 -1.539,-0.353 -7.834,-0.598 -9.666,-0.377 m 37.386,0.16 c -1.133,0.568 -1.106,0.31 -1.24,12.152 -0.066,5.867 -0.219,16.554 -0.341,23.75 -0.317,18.671 -0.309,19.859 0.129,20.447 0.82,1.1 1.014,1.137 5.982,1.137 7.344,0 6.857,0.745003 6.603,-10.101 -0.098,-4.161 -0.259,-14.954 -0.358,-23.983 -0.099,-9.029 -0.235,-17.786 -0.301,-19.46 l -0.12,-3.043 -0.54,-0.54 -0.54,-0.54 -4.372,-0.042 c -3.724,-0.036 -4.45,-0.003 -4.902,0.223 m 100.499001,0.572 c -11.219,0.921 -21.446,9.396 -24.63,20.408 -4.982,17.229 7.079,34.838 24.945,36.419 2.519,0.223003 27.963,0.225003 29.152,0.002 1.093,-0.205 1.633,-0.574 2.04,-1.392 0.563,-1.134 -0.056,-29.26 -0.717,-32.523 -2.917,-14.419 -15.969,-24.132 -30.79,-22.914 m 5.615,12.235 c 5.957,1.081 10.585,5.247 12.457,11.215 l 0.459,1.464 -0.013,8.584 c -0.014,9.277 -0.019,9.33 -0.903,9.789 -0.821,0.425 -17.264,0.191 -18.917,-0.269 -7.091,-1.976 -11.773,-8.049 -11.773,-15.271 0,-9.872 8.928,-17.282 18.69,-15.512 m 64.714,0.222 c 9.983,2.789 14.764,13.534 10.065,22.618 -5.916,11.434 -22.973,11.072 -28.437,-0.604 -1.337,-2.857 -1.359,-3.033 -1.519,-12.356 -0.16,-9.269 -0.156,-9.323 0.843,-9.831 0.973,-0.495 17.185,-0.347 19.048,0.173"
                  fill="black"
                  stroke={color} //"#02aae9"
                />
              </g>
            </svg>
          </div>
        </div>
      ) : type === "notFound" ? (
        <div className="flex items-center  justify-center">
          <div className="flex justify-center items-center">
            <div className="absolute bg-[#f62217] w-[75px] h-[75px] rounded-full" />
            <div className="rotate-scale-up-diag-2 w-auto">
              {IconsByName(
                "im",
                "ImCross",
                "45px",
                "0",
                theme === "dark" ? "white" : "black"
              )}
            </div>
          </div>
          <div className="ml-12">
            <CapParagraph literal={"Não Encontrado"} />
            <CapParagraph literal={"Recarregue a página"} />
            <CapParagraph
              literal={"Entre em Contato com a CZAR+, caso Problema Persista"}
            />
          </div>
        </div>
      ) : type === "404" ? (
        <div className="flex items-center justify-center">
          <div className="blink-2 w-auto mr-9">
            <div className="vibrate-1">
              {IconsByName(
                "ri",
                "RiGhostFill",
                "100px",
                "0",
                theme === "dark" ? "white" : "black"
              )}
            </div>
          </div>
          <div>
            <CapParagraph literal={"404"} />
            <CapParagraph literal={"Página Inexistente"} />
            <CapParagraph
              literal={"Entre em Contato com a CZAR+, caso Problema Persista"}
            />
          </div>
        </div>
      ) : type === "failed" ? (
        <div className="flex items-center">
          <div className="blink-2 w-auto mr-9">
            {IconsByName(
              "ri",
              "RiGhostFill",
              "100px",
              "0",
              theme === "dark" ? "white" : "black"
            )}
          </div>
          <div>
            <CapParagraph literal={"404"} />
            <CapParagraph literal={"Página Inexistente"} />
            <CapParagraph
              literal={"Entre em Contato com a CZAR+, caso Problema Persista"}
            />
          </div>
        </div>
      ) : type === "success" ? (
        <div className="flex flex-column items-center">
          <div className="bounce-in-top w-auto">
            {IconsByName("ri", "RiCheckboxCircleFill", "100px", "0", "#7dc523")}
          </div>
          <div className="flex flex-column items-center mt-6">
            {titles.map((l, i) => {
              return (
                <CapTextShowData
                  key={i}
                  label={titles[i]}
                  info={descriptions[i]}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
