import React, { useState, useEffect, useRef } from 'react';
import { DndContext, closestCorners, useSensors, useSensor, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiDotsSixVertical } from "react-icons/pi";

// Custom hook to detect clicks outside
function useOutsideClick(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}

function SortableItem({ id, value, index, moveToTop, moveDown, removeItem }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [showActions, setShowActions] = useState(false);
    const dropdownRef = useRef(null);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    useOutsideClick(dropdownRef, () => setShowActions(false));

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-[#F7F7F7] flex items-center h-[93px] w-full sm:w-[90%] shadow-md rounded-lg p-4 relative"
            {...attributes}
            {...listeners}
        >
            <PiDotsSixVertical className='text-xl mr-2 sm:mr-7 font-bold text-[#333]' />
            <img className="h-12 sm:h-20 w-20 sm:w-40 object-cover rounded-lg mr-2 sm:mr-4" src={value.image} alt={value.title} />
            <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
                <p className="flex-1 text-center">{value.title}</p>
                <p className="flex-1 text-center">{value.type}</p>
                <p className="flex-1 text-center">${value.price}</p>
                <button onClick={() => setShowActions(!showActions)} className="mt-2 sm:mt-0">
                    <BsThreeDotsVertical />
                </button>
            </div>
            {showActions && (
                <div ref={dropdownRef} className="z-50 absolute right-0 top-full mt-2 w-48 border border-gray-300 rounded shadow-lg bg-white">
                    <button
                        className="w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
                        onClick={() => {
                            moveToTop(index);
                            setShowActions(false);
                        }}
                    >
                        Move to Top
                    </button>
                    <button
                        className="w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
                        onClick={() => {
                            moveDown(index);
                            setShowActions(false);
                        }}
                    >
                        Move Down
                    </button>
                    <button
                        className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                        onClick={() => {
                            removeItem(id);
                            setShowActions(false);
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

function DragNDropCards() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/data.json')
            .then(response => response.json())
            .then(data => {
                const itemsWithIds = data.map((item, index) => ({ ...item, id: index.toString() }));
                setItems(itemsWithIds);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = items.findIndex(item => item.id === active.id);
            const newIndex = items.findIndex(item => item.id === over.id);
            setItems(arrayMove(items, oldIndex, newIndex));
        }
    };

    const moveToTop = (index) => {
        if (index > 0) {
            setItems(arrayMove(items, index, 0));
        }
    };

    const moveDown = (index) => {
        if (index < items.length - 1) {
            setItems(arrayMove(items, index, index + 1));
        }
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="bg-[#D2E3C8] min-h-[100vh] flex flex-col gap-5 justify-center items-center">
            <h2 className='text-8xl font-bold text-[#4F6F52] '>Chai aur Code</h2>
            <div className="bg-[#F7F7F7] flex flex-col gap-5 p-6 w-full sm:w-2/3 min-h-[600px] shadow-lg rounded-lg">
                <div className="flex flex-col gap-4">
                    <h2 className="text-[#313131] text-2xl sm:text-4xl font-bold">Manage Bundle</h2>
                    <p className="text-[#4B4747] text-lg sm:text-xl">Change orders of the products based on priority</p>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        <div className="drag flex flex-col justify-center items-center gap-4">
                            {items.map((value, index) => (
                                <SortableItem
                                    key={value.id}
                                    id={value.id}
                                    value={value}
                                    index={index}
                                    moveToTop={moveToTop}
                                    moveDown={moveDown}
                                    removeItem={removeItem}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}

export default DragNDropCards;
