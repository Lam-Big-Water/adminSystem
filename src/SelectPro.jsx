import { Modal } from "./compose/Modal";
import {Menus, Toggle, List, Button} from "./compose/Menus";
import { useSearchParams } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi2";

const SelectPro = ({filterField, options, icon}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultFilter = options[0]?.value || "";
    const currentFilter = searchParams.get(filterField) || defaultFilter;

    function handleClick (value) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(filterField, value);

        if (filterField !== "SortBy" && newParams.get("page")) {
            newParams.set("page", "1");
        }
        setSearchParams(newParams);
    }
    return (
        <Modal>
        <Menus>
            
            <Toggle text={filterField} styles="w-fit text-[var(--text-primary)] bg-[var(--filed-bg)] border-[1.6px] border-[var(--color-border)] rounded-md block cursor-pointer p-2" icon={icon} />
            <List>
                {options.map((option) => (
                    <Button styles={`${option.value === currentFilter ? "text-[var(--text-primary)] bg-[var(--hover-highlight)] shadow-md" : "text-[var(--text-second)]"}`} key={option.value} onClick={() => handleClick(option.value)}>
                        {option.label}
                    </Button>
                    
                    // <Button icon={<HiChevronDown className="w-full h-full"/>} key={option.value} onClick={() => handleClick(option.value)}>
                    //     {option.label}
                    // </Button>
                    
                ))}
                </List>
        </Menus>
        </Modal>
    )
}

export default SelectPro