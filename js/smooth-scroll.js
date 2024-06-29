const speed = 1.5;
const smooth = 20;
let scrollEl;
let pos = 0;
let moving = false;

const onScroll = (delta, t, callback) => {
  scrollEl = t;
  if (delta == 0) {
    callback();
  } else {
    const normalizedDelta = normalizeWheelDelta(delta);
    setPostion(normalizedDelta);
    if (!moving) {
      updateScroll(callback);
    }
  }
};

function setPostion(normalizedDelta) {
  const target = scrollEl;
  const frame = target === document.body ? document.documentElement : target;
  pos += normalizedDelta * speed;

  // Limit scrolling to element boundaries
  pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight));
}

function normalizeWheelDelta(delta) {
  const withDetail = Math.abs(delta) < 120;
  return delta / (withDetail ? 3 : 120);
}

function updateScroll(callback) {
  moving = true;
  const target = scrollEl;

  const delta = (pos - target.scrollTop) / smooth;
  const result = target.scrollTop + delta;

  target.scrollTop = result;

  const i = Math.abs(delta);
  if (i > 1) {
    window.requestAnimationFrame(() => {
      updateScroll(callback);
      if (callback) callback();
    });
  } else {
    moving = false;
  }
}

export { onScroll };
