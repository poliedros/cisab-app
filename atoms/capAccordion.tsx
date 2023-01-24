import { useTheme, useThemeUpdate } from "context/themeContext";
import { Accordion } from "react-bootstrap";
import CapSubtitle from "./capSubtitle";

export default function CapAccordion({
    css = "",
}: {
    css?: string;
}) {
    const theme = useTheme();
    const toggleTheme = useThemeUpdate();

    return <>
        <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0" className="bg-transparent">
                <Accordion.Header className={theme === "dark" ? "accordion-button.collapsed-dark" : ""}><CapSubtitle literal="Anderson" css="w-[inherit] mr-1.5 !my-0"/></Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="bg-transparent">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </>;
}
