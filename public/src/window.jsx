// Draggable, resizable window component
const { useState, useEffect, useRef } = React;

function Window({ id, title, x, y, w, h, minW=280, minH=180, z, focused, onFocus, onClose, onMove, onResize, children, noResize, isMobile }) {
  const [drag, setDrag] = useState(null); // {dx,dy}
  const [resize, setResize] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (!drag && !resize) return;
    const move = (e) => {
      const cx = e.clientX ?? (e.touches && e.touches[0].clientX);
      const cy = e.clientY ?? (e.touches && e.touches[0].clientY);
      if (drag && !isMobile) {
        const nx = Math.max(0, Math.min(window.innerWidth - 80, cx - drag.dx));
        const ny = Math.max(28, Math.min(window.innerHeight - 40, cy - drag.dy));
        onMove(id, nx, ny);
      } else if (resize && !isMobile) {
        const nw = Math.max(minW, cx - resize.x);
        const nh = Math.max(minH, cy - resize.y);
        onResize(id, nw, nh);
      }
    };
    const up = () => { setDrag(null); setResize(null); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
  }, [drag, resize, id, onMove, onResize, minW, minH]);

  const startDrag = (e) => {
    onFocus(id);
    const cx = e.clientX ?? (e.touches && e.touches[0].clientX);
    const cy = e.clientY ?? (e.touches && e.touches[0].clientY);
    setDrag({ dx: cx - x, dy: cy - y });
  };
  const startResize = (e) => {
    e.stopPropagation();
    onFocus(id);
    setResize({ x, y });
  };

  return (
    <div
      ref={ref}
      className={`window ${focused ? 'focused' : ''} ${drag && !isMobile ? 'dragging' : ''} ${isMobile ? 'is-mobile' : ''}`}
      style={{
        left: x, top: y, width: w, height: h,
        zIndex: z,
        opacity: focused ? 1 : (isMobile ? 0 : 0.985),
        filter: focused ? 'none' : 'saturate(0.92)',
        pointerEvents: focused || !isMobile ? 'auto' : 'none',
        visibility: isMobile && !focused ? 'hidden' : 'visible',
        display: 'flex'
      }}
      onMouseDown={() => onFocus(id)}
    >
      <div
        className={`titlebar ${drag && !isMobile ? 'dragging' : ''}`}
        onMouseDown={!isMobile ? startDrag : undefined}
        onTouchStart={!isMobile ? startDrag : undefined}
      >
        <div className="traffic">
          <span className="close" onClick={(e)=>{ e.stopPropagation(); onClose(id); }} onMouseDown={(e)=>e.stopPropagation()} title="close">
            <svg width="7" height="7" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M2 2 L8 8 M8 2 L2 8"/></svg>
          </span>
          {!isMobile && <span className="min" onMouseDown={(e)=>e.stopPropagation()} aria-hidden="true" />}
          {!isMobile && <span className="max" onMouseDown={(e)=>e.stopPropagation()} aria-hidden="true" />}
        </div>
        <div className="title" style={isMobile ? {paddingRight: 32} : {}}>{title}</div>
      </div>
      <div className="win-body scroll">
        {children}
      </div>
      {!noResize && !isMobile && (
        <div className="resize-handle" onMouseDown={startResize} onTouchStart={startResize} />
      )}
    </div>
  );
}

window.Window = Window;
