export default {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    circlePickers: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    singleCirclePicker: {
        margin: 30,
        backgroundColor: '#c6e2ff',
        padding: 10,
        borderRadius: 20,
        // width: 155,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '4px solid white',
        boxSizing: 'border-box',
    },
    backButton: {
        backgroundColor: 'white',
        border: 'none',
        padding: '15px 30px',
        fontSize: 30,
        color: '#f00',
        cursor: 'pointer',
        marginTop: 30,
        borderRadius: 20
    },
    attempts: {
        fontSize: 25,
        margin: 5,
        color: 'white',
    },
    closeO: {
        fontSize: 40,
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    closeOCorrectOrFalseIcon: {
        // position: 'absolute',
        fontSize: 20,
        left: 0,
        marginLeft: 5,

        backgroundColor: 'white',
        borderRadius: 20,
        display: 'flex',
        padding: 3
    }
}