import {
    DetailedHTMLProps,
    HTMLAttributes,
    RefObject,
    ReactNode,
    useState,
} from "react";
import { Modal, Button, ModalProps } from "react-bootstrap";
import { Omit, BsPrefixProps } from "react-bootstrap/esm/helpers";

import axios from "axios";

import CapImage from "atoms/capImage";
import CapBtn from "atoms/capBtn";

export default function CountyImageModal(
    props: JSX.IntrinsicAttributes &
        Omit<
            Pick<
                DetailedHTMLProps<
                    HTMLAttributes<HTMLDivElement>,
                    HTMLDivElement
                >,
                "key" | keyof HTMLAttributes<HTMLDivElement>
            > & {
                ref?:
                    | ((instance: HTMLDivElement | null) => void)
                    | RefObject<HTMLDivElement>
                    | null
                    | undefined;
            },
            BsPrefixProps<"div"> & ModalProps
        > &
        BsPrefixProps<"div"> &
        ModalProps & { children?: ReactNode }
) {
    const [file, setFile] = useState({});
    //const { id } = props.county._id;

    /* const editCounty = async (county: CountyDTO): Promise<CountyDTO | undefined> => {
        const data = await fetch(`/api/counties/${id}`, {
            method: "PUT",
            body: JSON.stringify(county),
        }); //.finally(() => setLoading(false));
        if (data.status === 200) {
            alert("success");
            const mb = document.querySelectorAll('.messageB');
            mb.forEach(m => {
                m.classList.remove('swing-in-right-bck');
                m.classList.add('swing-in-right-bck');
            });
            const mb2 = document.querySelectorAll('.messageB2');
            mb2.forEach(m => {
                m.classList.remove('swing-in-left-bck');
                m.classList.add('swing-in-left-bck');
            });
            const response = await data.json();
            return response;
        } else {
            alert("fault");
            //setTimeout;
        }
        return undefined;
    }; */

    const handleSubmit3 = async (file: any) => {
        let countyWithoutImage = props.county;
        const request = {
            file,
        };
        debugger;
        const res = await axios.post("https://api.images.czar.dev", request, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const id = res.data.id;
        countyWithoutImage.county.flag = `https://catalogv2.blob.core.windows.net/storage-images/${id}`;
        //editCounty(countyWithoutImage);

        return `https://catalogv2.blob.core.windows.net/storage-images/${id}`;
    };

    const handleClick = async () => {
        const linkResponse = await handleSubmit3(file);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="border-0"></Modal.Header>
            <Modal.Body>
                <CapImage src={""} w={200} h={200} obj="contain" />
                <input
                    type="file"
                    id="input-file-now-custom-2"
                    data-height="0"
                    onChange={(e) => {
                        const files = e.target.files;
                        const formData = new FormData();

                        if (!files) return;
                        if (files.length <= 0) return;
                    }}
                />
                <Button onClick={handleClick}>Upload</Button>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <CapBtn kind="close" click={props.onHide} />
            </Modal.Footer>
        </Modal>
    );
}
