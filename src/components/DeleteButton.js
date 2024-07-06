
import { useState } from "react";



export default function DeleteButton({ label, onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className="fixed bg-black/50 inset-0 flex items-center h-full justify-center">
                <div className="bg-white p-4 rounded-lg">
                    <div>Are you sure ?</div>
                    <div className="flex gap-2 mt-1">
                        <button type="button" onClick={() => setShowConfirm(false)}>
                            Cancel
                        </button>
                        <button
                            onClick={() => {onDelete(); setShowConfirm(false)}}
                            type="button"
                            className="primary">
                                {/* &nbsp; означава nobreakingspace тоест да са на един ред а не една под друга */}
                            Yes,&nbsp;delete!
                        </button>
                    </div>
                </div>
            </div>


        );
    }

    return (
        <button type="button" onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    );
}


//izpolzvame tozi sukraten zapis za delete button primerno v app/menu-items/edit/[id]/page.js