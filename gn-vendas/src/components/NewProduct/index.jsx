import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import Select from 'react-select';
import { BsImage } from 'react-icons/bs';
import { toast } from 'react-toastify';
import ReactCrop from 'react-image-crop';
import { Container } from './styles';
import 'react-image-crop/dist/ReactCrop.css';
import api from '../../services/api';

function NewProduct({ handleClose }) {
  const [file, setFile] = useState();
  const [crop, setCrop] = useState({ unit: 'px', aspect: 1 });
  const [image, setImage] = useState();
  const [result, setResult] = useState();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };
  const defaultMaskOptions = {
    prefix: 'R$ ',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 7, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
  };
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  });

  function getCroppedImg() {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL('image/jpeg');

    setResult(base64Image);
    setFile(null);
  }

  useEffect(() => {
    async function getCategories() {
      const response = await api.get('/categories');
      if (response.status === 200) {
        const aux = response.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setCategories(aux);
      }
    }
    getCategories();
  }, []);
  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  async function handleSubmit() {
    if (!result || !name || !category || !price || !description) {
      toast('Preencha todos os campos corretamente', {
        position: 'top-right',
        type: 'error',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
      return 0;
    }
    const data = new FormData();
    const file_upload = DataURIToBlob(result);
    const price_split = price.replace('R$ ', '').replaceAll('.', '').split(',');
    const price_formatted = `${price_split[0]}${
      price_split.length > 1 ? price_split[1] : '00'
    }`;
    data.append('img', file_upload);
    data.append('description', description);
    data.append('name', name);
    data.append('category_id', category);
    data.append('price', parseInt(price_formatted, 10));
    try {
      const response = await api.post('/products', data);
      if (response.status === 201) {
        handleClose();
      }
    } catch (error) {
      toast(error, {
        position: 'top-right',
        type: 'error',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
    return 1;
  }

  return (
    <Container open>
      <div className="content">
        {file ? (
          <div className="image-crop-container">
            <ReactCrop
              src={file}
              crop={crop}
              onImageLoaded={setImage}
              onChange={(c) => setCrop(c)}
            />
            <button type="button" onClick={() => getCroppedImg()}>
              Salvar
            </button>
          </div>
        ) : (
          <>
            <h3>Adicionar produto</h3>
            <div className="top">
              <div className="add-image">
                {result ? (
                  <img src={result} alt="" />
                ) : (
                  <label htmlFor="upload">
                    <BsImage size={40} />
                    <input
                      type="file"
                      name="upload"
                      id="upload"
                      onChange={onSelectFile}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>
              <div className="product-data">
                <input
                  type="text"
                  placeholder="Nome"
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  name=""
                  id=""
                  placeholder="Descrição"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <MaskedInput
                  mask={currencyMask}
                  inputMode="numeric"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Preço"
                />
              </div>
            </div>
            <div className="bottom">
              <Select
                options={categories}
                onChange={(e) => setCategory(e.value)}
              />
            </div>
            <footer>
              <button type="button" onClick={handleClose}>
                Cancelar
              </button>
              <button type="button" onClick={handleSubmit}>
                Adicionar
              </button>
            </footer>
          </>
        )}
      </div>
    </Container>
  );
}

export default NewProduct;
