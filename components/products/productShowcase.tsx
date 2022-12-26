import CapIconButton from "atoms/capIconButton";
import CapImage from "atoms/capImage";
import CapInfoBoard from "atoms/capInfoBoard";
import CapTitle from "atoms/capTitle";
import { ProductDTO } from "pages/api/products";
import { Col, Row } from "react-bootstrap";

export default function ProductShowcase({ product }: { product: ProductDTO }) {
    return (
        <>
            <Row className="flex items-center">
                <Col sm={4} className="flex justify-center mb-12">
                    <div className="absolute bg-[silver] w-[200px] h-[200px] rounded-full circle">
                        <ul className="menu">
                            <li>
                                <CapIconButton
                                    iconType="fa"
                                    icon="FaBalanceScale"
                                    size="24px"
                                />
                            </li>
                            <li>
                                <CapIconButton
                                    iconType="md"
                                    icon="MdAddCircle"
                                    size="24px"
                                />
                            </li>
                            <li>
                                <CapIconButton
                                    iconType="fa"
                                    icon="FaInfoCircle"
                                    size="24px"
                                />
                            </li>
                        </ul>
                    </div>
                    <CapImage
                        src={"https://mergejil.mn/mergejilmn/no-image.svg"} //county.county.flag
                        //alt={county.name}
                        w={200}
                        h={200}
                        obj="contain"
                    />
                </Col>
                <Col sm={8} className="flex flex-column items-start text-left">
                    <CapTitle
                        literal={product.name}
                        additional={{ label: " !text-4xl !m-0" }}
                    />
                    <h6 className="lowercase mt-2 tracking-widest text-[silver]">
                        {product.categories?.map((c) => c + " ")}
                    </h6>
                    <CapInfoBoard
                    litTitle={
                       "Descrição do Produto"
                    }
                    litSubtitle="Anderson Mendes"
                    litSentences={//[
                        product.measurements?.map((p) =>
                            `${p.name}: ${p.value}${p.unit}`
                        )
                        //product.measurements ? product.measurements[0].name : "",
                        /* `${county.accountable.address} - ${county.accountable.zipCode}`,
                        county.accountable.phone,
                        county.accountable.email,
                        county.accountable.socialMedias,
                        county.accountable.note, */
                    //]
                }
                    style={[
                        "email",
                        /* "huge",
                        "email",
                        "default",
                        "default", */
                    ]}
                />
                </Col>
            </Row>
            <Row className="mt-3">
                
            </Row>
        </>
    );
}
