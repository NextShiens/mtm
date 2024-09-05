import React from "react";

const EditModal = ({ onOk, onCancel }) => {
  return (
    <div>
      <p className="text-blackColor  text-[18px]">
        Are you sure you want to edit this event?
      </p>
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="px-[10px] py-[5px]  text-[14px] text-blackColor text-opacity-[0.68] bg-homeBtnBgColor rounded-[5px]   border  border-borderColor border-opacity-[0.10]  gap-1  "
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-[10px] py-[5px]  text-[14px] bg-navBtnBg-Color  rounded-[5px] text-white   gap-1"
          onClick={onOk}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditModal;
