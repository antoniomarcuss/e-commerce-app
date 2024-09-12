import { useEffect, useState, useRef } from "react";
import "../../src/app/globals.css";

export const useDropdownViewModel = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    });
  }, [ref, setIsOpen]);

  const toggleDropdown = () => setIsOpen(true);

  return { ref, toggleDropdown, IsOpen };
};

const Dropdown = ({ children, title }) => {
  const { ref, toggleDropdown, IsOpen } = useDropdownViewModel();
  return (
    <div ref={ref} className=" relative">
      <button onClick={toggleDropdown}>{title}</button>
      {IsOpen && (
        <div className="absolute top-5 w-fit rounded-lg  left-0 shadow-xl bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

describe("<Dropdown/>", () => {
  // 1° Escrever um teste que falha
  // 2° Escrever o códdigo para fazer o teste passar
  // 3° Refatorar o código para que o teste passe novamente
  it("have to open the dropdown", () => {
    cy.nextMount(
      <Dropdown title={"Abrir Dropdown"}>
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      </Dropdown>
    );

    cy.get("button").click();

    cy.get("ul").should("be.visible");
  });

  it("have to close the dropdown when clicking outside", () => {
    cy.nextMount(
      <div>
        <Dropdown title={"Abrir Dropdown"}>
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </Dropdown>
        <div id="outside"></div>
      </div>
    );
    cy.get("button").click();
    cy.get("#outside").click({ force: true });
    cy.get("ul").should("not.exist");
  });
});
