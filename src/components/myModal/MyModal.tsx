import React, { useEffect } from 'react';
import Modal from 'react-modal';

interface IModal {
    isOpen: boolean,
    onRequestClose: () => void,
    attempts: number,
    contentLabel: string
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    restartButton: {
        backgroundColor: '#2196f3',
        border: 'none',
        padding: '15px 30px',
        fontSize: 25,
        color: 'white',
        cursor: 'pointer',
        marginTop: 30
    }
};

const MyModal: React.FC<IModal> = (modal: IModal) => {
    useEffect(() => {
        Modal.setAppElement('body');
    }, [])
    return(
        <Modal 
            isOpen={modal.isOpen}
            onRequestClose={modal.onRequestClose}
            contentLabel={modal.contentLabel}
            style={customStyles}
            onAfterOpen={() => {}}
        >
            <h2 style={{color: 'red', fontSize: 30}}>Congratulations!!</h2>
            <div style={{fontSize: 20}}>You solved the problem in <span style={{fontSize: 30, color: 'red'}}>{modal.attempts}</span> attempts!</div>
            <button style={customStyles.restartButton as React.CSSProperties} onClick={modal.onRequestClose}>Restart</button>
        </Modal>
    );
}

export default MyModal;
