
export default function Loading () {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'solid 3px var(--secondary-two)', borderTopColor: 'transparent', animation: 'spin infinite linear .5s' }}></div>
        </div>
    );
}