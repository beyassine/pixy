import cv2
import numpy as np
from PIL import Image
import io

def rect_with_rounded_corners(image, r, t, c):
    """
    :param image: image as NumPy array
    :param r: radius of rounded corners
    :param t: thickness of border
    :param c: color of border
    :return: new image as NumPy array with rounded corners
    """

    c += (255, )

    h, w = image.shape[:2]

    # Create new image (three-channel hardcoded here...)
    new_image = np.ones((h+2*t, w+2*t, 4), np.uint8) * 255
    new_image[:, :, 3] = 0

    # Draw four rounded corners
    new_image = cv2.ellipse(new_image, (int(r+t/2), int(r+t/2)), (r, r), 180, 0, 90, c, t)
    new_image = cv2.ellipse(new_image, (int(w-r+3*t/2-1), int(r+t/2)), (r, r), 270, 0, 90, c, t)
    new_image = cv2.ellipse(new_image, (int(r+t/2), int(h-r+3*t/2-1)), (r, r), 90, 0, 90, c, t)
    new_image = cv2.ellipse(new_image, (int(w-r+3*t/2-1), int(h-r+3*t/2-1)), (r, r), 0, 0, 90, c, t)

    # Draw four edges
    new_image = cv2.line(new_image, (int(r+t/2), int(t/2)), (int(w-r+3*t/2-1), int(t/2)), c, t)
    new_image = cv2.line(new_image, (int(t/2), int(r+t/2)), (int(t/2), int(h-r+3*t/2)), c, t)
    new_image = cv2.line(new_image, (int(r+t/2), int(h+3*t/2)), (int(w-r+3*t/2-1), int(h+3*t/2)), c, t)
    new_image = cv2.line(new_image, (int(w+3*t/2), int(r+t/2)), (int(w+3*t/2), int(h-r+3*t/2)), c, t)

    # Generate masks for proper blending
    mask = new_image[:, :, 3].copy()
    mask = cv2.floodFill(mask, None, (int(w/2+t), int(h/2+t)), 128)[1]
    mask[mask != 128] = 0
    mask[mask == 128] = 1
    mask = np.stack((mask, mask, mask), axis=2)

    # Blend images
    temp = np.zeros_like(new_image[:, :, :3])
    temp[(t-1):(h+t-1), (t-1):(w+t-1)] = image.copy()
    new_image[:, :, :3] = new_image[:, :, :3] * (1 - mask) + temp * mask

    # Set proper alpha channel in new image
    temp = new_image[:, :, 3].copy()
    new_image[:, :, 3] = cv2.floodFill(temp, None, (int(w/2+t), int(h/2+t)), 255)[1]

    return new_image

def editimagesquare(image,datacrop):
    if np.size(image, 0) > np.size(image, 1) :
        image=np.rot90(image)
    data=datacrop.split(',')
    cropX = int(float(str(data[0].split(':')[1])))
    cropY = int(float(str(data[1].split(':')[1])))
    cropWidth = int(float(str(data[2].split(':')[1])))
    cropHeight = int(float(str(data[3].split(':')[1])))
    if cropX < 0:
        cropX=0
    if cropY < 0:
        cropY=0

    image = image[cropY:cropY+cropHeight, cropX:cropX+cropWidth]

    edited_img=cv2.detailEnhance(image, sigma_s=1, sigma_r=0.15)
    return edited_img


def editimage(image):
    if np.size(image, 0) > np.size(image, 1) :
        image=np.rot90(image)
    edited_img=cv2.detailEnhance(image, sigma_s=1, sigma_r=0.15)
    return edited_img

def resizeimage(image):

    im_pil=Image.open(io.BytesIO(image))
    exif = im_pil._getexif()
    orientation_key = 274 # cf ExifTags
    if exif and orientation_key in exif:
        orientation = exif[orientation_key]
        rotate_values = {
            3: Image.ROTATE_180,
            6: Image.ROTATE_270,
            8: Image.ROTATE_90
        }
        if orientation in rotate_values:
            im_pil = im_pil.transpose(rotate_values[orientation])


    img_cv=np.array(im_pil)

    
    h, w = img_cv.shape[:2]

    if h > w :
        if h > 2024:
            scale = 1024 / h
        else:
            scale = 1
    else :
        if w> 1024 :
            scale = 1024 / w
        else:
            scale = 1

    height= int(h * scale)
    width = int(w *scale)
    dim = (width, height)
    resized_img = cv2.resize(img_cv, dim, interpolation = cv2.INTER_AREA)

    im_pil=Image.fromarray(resized_img)

    buffer=io.BytesIO()
    im_pil.save(buffer,format='png')
    resized_img=buffer.getvalue()

    return resized_img
