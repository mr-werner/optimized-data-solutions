import React from 'react';


export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div onClick={onClose} style={styles.overlay}>
      <div onClick={(e) => e.stopPropagation()} style={styles.modal}>
        <button onClick={onClose} style={styles.close}>✕</button>
        {children}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
  },
  modal: {
    background: '#fff',
    padding: '2rem',
    margin: '100px auto',
    width: '300px',
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
};