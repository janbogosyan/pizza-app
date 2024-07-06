import Trash from "@/components/icons/Trash";
import Plus from "@/components/icons/Plus";
import ChevronUp from "@/components/icons/ChevronUp";
import ChevronDown from "@/components/icons/ChevronDown";
import { useState } from "react";


//взимаме ги oт MenuitemForm
export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {

    const [isOpen, setIsOpen] = useState(false);

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }];
        });
    }

    //7:10:00
    function editProp(e, index, prop) {
        const newValue = e.target.value;
        setProps(prevProps => {
            const newSizes = [...prevProps];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove));
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="inline-flex p-1 border-0 justify-start"
                type="button">
                {/* Toggle */}
                {isOpen && (
                    <ChevronUp />
                )}
                {!isOpen && (
                    <ChevronDown />
                )}
                <span>{name}</span>
                <span>({props?.length})</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {props?.length > 0 && props.map((size, index) => (
                    <div className="flex items-end gap-2">
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder="Size name"
                                value={size.name}
                                onChange={e => editProp(e, index, 'name')}
                            />
                        </div>
                        <div>
                            <label>Extra price</label>
                            <input type="text" placeholder="Extra price"
                                value={size.price}
                                onChange={e => editProp(e, index, 'price')}
                            />
                        </div>
                        <div>
                            {/* type="button so we dont submit this form" */}
                            <button type="button"
                                onClick={() => removeProp(index)}
                                className="bg-white mb-4 px-2">
                                <Trash />
                            </button>
                        </div>

                    </div>
                ))}
                <button
                    // type="button" so it will not submit the form
                    type="button"
                    onClick={addProp}
                    className="bg-white items-center"
                >
                    <Plus className="w-4 h-4 " />
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>
    )
}