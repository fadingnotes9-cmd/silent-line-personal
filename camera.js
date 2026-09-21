// Kompres gambar di canvas (max 200 KB)
function compressImage(file, maxKB) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const maxDim = 1280;
        if (width > maxDim || height > maxDim) {
          if (width > height) { height = Math.round(height * maxDim / width); width = maxDim; }
          else { width = Math.round(width * maxDim / height); height = maxDim; }
        }
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        let q = 0.85;
        let dataUrl = canvas.toDataURL('image/jpeg', q);
        while (dataUrl.length * 0.75 / 1024 > maxKB && q > 0.3) {
          q -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', q);
        }
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

window.uploadPhoto = async function(file) {
  try {
    const dataUrl = await compressImage(file, 200);
    const sizeKB = Math.round(dataUrl.length * 0.75 / 1024);
    if (typeof window.sendPhotoMessage === 'function') {
      await window.sendPhotoMessage(dataUrl, sizeKB);
    } else {
      alert('ERROR: sendPhotoMessage belum siap');
    }
  } catch(e) {
    alert('Compress error: ' + e.message);
  }
};

window.tryCamera = async function() {
  try {
    const c = window.Capacitor;
    if (!c || !c.Plugins || !c.Plugins.Camera) {
      const list = (c && c.Plugins) ? Object.keys(c.Plugins).join(', ') : 'TIDAK ADA';
      alert('DEBUG:\nCapacitor: ' + (c ? 'ADA' : 'TIDAK ADA') + '\nPlugins: ' + list);
      return;
    }
    const p = await c.Plugins.Camera.getPhoto({
      quality: 85,
      allowEditing: false,
      resultType: 'base64',
      source: 'PROMPT'
    });
    const byteString = atob(p.base64String);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    const blob = new Blob([ab], { type: 'image/jpeg' });
    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    await window.uploadPhoto(file);
  } catch(e) {
    if (e.message && e.message.indexOf('cancel') < 0) {
      alert('Camera error: ' + (e.message || e));
    }
  }
};
