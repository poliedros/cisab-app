import * as IconsAi from "react-icons/ai"
import * as IconsBi from "react-icons/bi"
import * as IconsBs from "react-icons/bs"
import * as IconsCg from "react-icons/cg"
import * as IconsCi from "react-icons/ci"
import * as IconsFa from "react-icons/fa"
import * as IconsFi from "react-icons/fi"
import * as IconsGi from "react-icons/gi"
import * as IconsGo from "react-icons/go"
import * as IconsGr from "react-icons/gr"
import * as IconsHi from "react-icons/hi"
//import * as IconsHi2 from "react-icons/hi2"
import * as IconsIm from "react-icons/im"
import * as IconsMd from "react-icons/md"
import * as IconsIo from "react-icons/io"
import * as IconsIo5 from "react-icons/io5"
import * as IconsRi from "react-icons/ri"
import * as IconsSi from "react-icons/si"
import * as IconsTi from "react-icons/ti"

import { BsSlashCircleFill } from "react-icons/bs"

export default function IconsByName(ico, name, size = "auto", margin="0") {
    let IconComponent;

    if (ico === "ai") IconComponent = IconsAi[name];
    if (ico === "bi") IconComponent = IconsBi[name];
    if (ico === "bs") IconComponent = IconsBs[name];
    if (ico === "ci") IconComponent = IconsCi[name];
    if (ico === "cg") IconComponent = IconsCg[name];
    if (ico === "fa") IconComponent = IconsFa[name];
    if (ico === "fi") IconComponent = IconsFi[name];
    if (ico === "gi") IconComponent = IconsGi[name];
    if (ico === "go") IconComponent = IconsGo[name];
    if (ico === "gr") IconComponent = IconsGr[name];
    if (ico === "hi") IconComponent = IconsHi[name];
    //if (ico === "hi2") IconComponent = IconsHi2[name];
    if (ico === "im") IconComponent = IconsIm[name];
    if (ico === "io") IconComponent = IconsIo[name];
    if (ico === "io5") IconComponent = IconsIo5[name];
    if (ico === "md") IconComponent = IconsMd[name];
    if (ico === "ri") IconComponent = IconsRi[name];
    if (ico === "si") IconComponent = IconsSi[name];
    if (ico === "ti") IconComponent = IconsTi[name];

    if (!IconComponent) {
        // Return a default one
        return <BsSlashCircleFill style={{ width: size, height: size }} />;
    }

    return <IconComponent style={{ width: size, height: size, margin: margin }} />;
}