import * as IconsAi from "react-icons/ai"
import * as IconsBi from "react-icons/bi"
import * as IconsBs from "react-icons/bs"
import * as IconsCg from "react-icons/cg"
import * as IconsFa from "react-icons/fa"
import * as IconsGi from "react-icons/gi"
import * as IconsGr from "react-icons/gr"
import * as IconsHi from "react-icons/hi"
import * as IconsMd from "react-icons/md"
import * as IconsIo from "react-icons/io"
import * as IconsIo5 from "react-icons/io5"
import * as IconsRi from "react-icons/ri"
import * as IconsSi from "react-icons/si"
import * as IconsTi from "react-icons/ti"

import { BsSlashCircleFill } from "react-icons/bs"

export default function IconsByName(ico, name, size = "auto", margin="0", fill = "current") {
    let IconComponent;

    if (ico === "ai") IconComponent = IconsAi[name];
    if (ico === "bi") IconComponent = IconsBi[name];
    if (ico === "bs") IconComponent = IconsBs[name];
    if (ico === "cg") IconComponent = IconsCg[name];
    if (ico === "fa") IconComponent = IconsFa[name];
    if (ico === "gi") IconComponent = IconsGi[name];
    if (ico === "gr") IconComponent = IconsGr[name];
    if (ico === "hi") IconComponent = IconsHi[name];
    if (ico === "io") IconComponent = IconsIo[name];
    if (ico === "io5") IconComponent = IconsIo5[name];
    if (ico === "md") IconComponent = IconsMd[name];
    if (ico === "ri") IconComponent = IconsRi[name];
    if (ico === "si") IconComponent = IconsSi[name];
    if (ico === "ti") IconComponent = IconsTi[name];

    if (!IconComponent) {
        // Return a default one
        return <BsSlashCircleFill style={{ width: size, height: size, fill: fill }} />;
    }

    return <IconComponent style={{ width: size, height: size, margin: margin, fill: fill }} />;
}