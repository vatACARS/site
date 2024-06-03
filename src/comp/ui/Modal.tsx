'use client'

const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-1/2 bg-slate-100 border-2 border-slate-600 py-2 px-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <span className="font-semibold">{title}</span>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            X
          </button>
        </div>
        {children} 
      </div>
    </div>
  );
};

export default Modal;