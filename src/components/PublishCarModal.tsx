import React, { useState, useRef } from 'react';
import { VehicleItem } from '../types';
import {
  X,
  Plus,
  Sparkles,
  Check,
  Car,
  Euro,
  DollarSign,
  Image as ImageIcon,
  Upload,
  FolderPlus,
  Trash2,
  Camera,
  Star,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Layers
} from 'lucide-react';

interface PublishCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newVehicle: VehicleItem) => void;
  currency: 'EUR' | 'BRL';
}

interface UploadedPhoto {
  id: string;
  name: string;
  dataUrl: string;
}

const STOCK_IMAGE_PRESETS = [
  { label: 'Stand Guimarães Dakar (Exterior Noturno)', url: '/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif' },
  { label: 'Mural Oficial Guimarães Dakar', url: '/assets/aistudio/456aff26-7010-49ef-a07a-d269496f583b_ca200d61.jfif' },
  { label: 'SUV de Luxo Cinzento', url: '/src/assets/images/car_porsche_macan_1794394696079.jpg' },
  { label: 'Sedan Executivo Azul Escuro', url: '/src/assets/images/car_mercedes_amg_1794394696046.jpg' }
];

const POPULAR_FEATURES = [
  'Teto panorâmico elétrico',
  'Estofos desportivos em pele',
  'Cockpit digital panorâmico',
  'Faróis LED Matrix adaptativos',
  'Câmara 360º com sensores',
  'Apple CarPlay e Android Auto sem fios',
  'Sistema de som surround premium',
  'Assistente ativo de faixa e ângulo morto',
  'Chave inteligente Keyless Go',
  'Jantes desportivas de liga leve'
];

export const PublishCarModal: React.FC<PublishCarModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  currency,
}) => {
  const [brand, setBrand] = useState('BMW');
  const [model, setModel] = useState('Série 3 Touring');
  const [version, setVersion] = useState('320d Pack M Sport Auto 190cv');
  const [year, setYear] = useState<number>(2024);
  const [price, setPrice] = useState<number>(34500);
  const [mileageKm, setMileageKm] = useState<number>(45000);
  const [fuel, setFuel] = useState<'Gasolina' | 'Diesel' | 'Híbrido' | 'Elétrico' | 'Flex'>('Diesel');
  const [transmission, setTransmission] = useState<'Automático' | 'Manual' | 'PDK / Dupla Embreagem'>('Automático');
  const [category, setCategory] = useState<'SUV' | 'Sedan' | 'Esportivo' | 'Elétrico'>('Sedan');
  const [color, setColor] = useState('Branco Alpino');
  const [plateFinal, setPlateFinal] = useState('PT-24');
  const [warrantyMonths, setWarrantyMonths] = useState<number>(24);
  const [inspectionItemsCount] = useState<number>(180);
  const [selectedImage, setSelectedImage] = useState(STOCK_IMAGE_PRESETS[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  
  // Local file upload states (multiple photos from computer folders, min 6 recommended)
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [uploadError, setUploadError] = useState<string>('');
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Teto panorâmico elétrico',
    'Estofos desportivos em pele',
    'Cockpit digital panorâmico',
    'Faróis LED Matrix adaptativos',
    'Câmara 360º com sensores'
  ]);
  const [customFeatureInput, setCustomFeatureInput] = useState('');
  const [description, setDescription] = useState(
    'Viatura nacional em estado estritamente rigoroso, com histórico de revisões comprovado na marca oficial. Garantia de 24 meses sem limite de quilómetros, assistência em viagem e viatura de substituição. Possibilidade de financiamento com ou sem entrada inicial e aceitação de retoma.'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleAddCustomFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (customFeatureInput.trim() && !selectedFeatures.includes(customFeatureInput.trim())) {
      setSelectedFeatures([...selectedFeatures, customFeatureInput.trim()]);
      setCustomFeatureInput('');
    }
  };

  // Canvas image compressor to ensure fast loading and safe localStorage footprint
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) {
          reject(new Error('Falha ao ler o ficheiro'));
          return;
        }
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 750;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimized = canvas.toDataURL('image/jpeg', 0.78);
            resolve(optimized);
          } else {
            resolve(dataUrl);
          }
        };
        img.onerror = () => reject(new Error('Falha ao processar imagem'));
        img.src = dataUrl;
      };
      reader.onerror = () => reject(new Error('Erro na leitura do disco'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadError('');
    setIsProcessingFiles(true);

    try {
      const newPhotos: UploadedPhoto[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          continue;
        }
        try {
          const optimized = await compressImage(file);
          newPhotos.push({
            id: `photo-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
            name: file.name,
            dataUrl: optimized
          });
        } catch (err) {
          console.error('Erro ao converter foto:', file.name, err);
        }
      }

      if (newPhotos.length === 0) {
        setUploadError('Por favor selecione ficheiros de imagem válidos (JPG, PNG ou WEBP).');
      } else {
        setUploadedPhotos((prev) => [...prev, ...newPhotos]);
        setCustomImageUrl('');
      }
    } catch (err) {
      setUploadError('Ocorreu um erro ao carregar as imagens selecionadas.');
    } finally {
      setIsProcessingFiles(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = (idToRemove: string) => {
    setUploadedPhotos((prev) => prev.filter((p) => p.id !== idToRemove));
  };

  const handleSetCoverPhoto = (index: number) => {
    if (index <= 0 || index >= uploadedPhotos.length) return;
    setUploadedPhotos((prev) => {
      const copy = [...prev];
      const [selected] = copy.splice(index, 1);
      return [selected, ...copy];
    });
  };

  const handleMovePhoto = (index: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= uploadedPhotos.length) return;
    setUploadedPhotos((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  const handleClearAllPhotos = () => {
    setUploadedPhotos([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerateDescription = () => {
    const text = `Excepcional ${brand} ${model} (${version}) do ano ${year}, com apenas ${mileageKm.toLocaleString()} km reais e comprovados. Carroçaria em estado irrepreensível na cor ${color}, equipado com transmissão ${transmission.toLowerCase()} e motorização ${fuel.toLowerCase()}.\n\nInclui garantia escrita até 36 meses e facilidade de aprovação de crédito imediato com ou sem entrada. Aceitamos retoma da sua viatura atual com avaliação justa.`;
    setDescription(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const monthlyEst = Math.round(price * 0.0125);
    
    // Build photo gallery (minimum 6 supported)
    const gallery = uploadedPhotos.length > 0
      ? uploadedPhotos.map((p) => p.dataUrl)
      : (customImageUrl.trim() ? [customImageUrl.trim()] : [selectedImage]);

    const mainImage = gallery[0] || selectedImage;

    const newVehicle: VehicleItem = {
      id: `car-${Date.now()}`,
      brand: brand.trim(),
      model: model.trim(),
      version: version.trim(),
      year: Number(year),
      price: Number(price),
      monthlyEstimate: monthlyEst,
      mileageKm: Number(mileageKm),
      fuel,
      transmission,
      category,
      image: mainImage,
      galleryImages: gallery,
      color: color.trim(),
      plateFinal: plateFinal.trim() || 'PT-24',
      inspectionItemsCount,
      warrantyMonths: Number(warrantyMonths),
      available: true,
      features: selectedFeatures
    };

    onPublish(newVehicle);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  const currencyIcon = currency === 'EUR' ? <Euro className="w-4 h-4 text-slate-400" /> : <DollarSign className="w-4 h-4 text-slate-400" />;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Publicar Novo Automóvel no Stand
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Preencha os dados completos para disponibilizar imediatamente o carro no catálogo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Automóvel Publicado com Sucesso!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              O veículo <strong>{brand} {model}</strong> já está visível na vitrine online com todas as especificações e fotos cadastradas.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Bloco 1: Identificação do Veículo */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                1. Identificação Principal
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Marca *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Ex: BMW, Porsche, Audi"
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Ex: Série 3, Macan, Classe A"
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Ano de Fabrico *
                  </label>
                  <input
                    type="number"
                    required
                    min={2000}
                    max={2026}
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Versão & Motorização Detalhada *
                </label>
                <input
                  type="text"
                  required
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="Ex: 2.0 TDI 190cv S-Line Tiptronic"
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                />
              </div>
            </div>

            {/* Bloco 2: Preço e Financiamento */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                2. Preço de Venda & Condições Comerciais
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Preço à Vista ({currency === 'EUR' ? '€' : 'R$'}) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {currencyIcon}
                    </div>
                    <input
                      type="number"
                      required
                      min={1000}
                      step={100}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 text-sm font-mono tabular-nums bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Quilometragem (Km) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={mileageKm}
                    onChange={(e) => setMileageKm(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono tabular-nums bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Garantia Incluída
                  </label>
                  <select
                    value={warrantyMonths}
                    onChange={(e) => setWarrantyMonths(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  >
                    <option value={12}>12 Meses (1 Ano)</option>
                    <option value={18}>18 Meses (1,5 Anos)</option>
                    <option value={24}>24 Meses (2 Anos - Recomendado)</option>
                    <option value={36}>36 Meses (3 Anos Total)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bloco 3: Características Técnicas */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                3. Especificações Técnicas
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Combustível
                  </label>
                  <select
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  >
                    <option value="Gasolina">Gasolina</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Elétrico">Elétrico</option>
                    <option value="Flex">Flex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Transmissão / Caixa
                  </label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  >
                    <option value="Automático">Automático</option>
                    <option value="Manual">Manual</option>
                    <option value="PDK / Dupla Embreagem">PDK / Dupla Embreagem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  >
                    <option value="SUV">SUV / Crossover</option>
                    <option value="Sedan">Sedan / Berlina</option>
                    <option value="Esportivo">Desportivo / Coupé</option>
                    <option value="Elétrico">100% Elétrico</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Cor Externa
                  </label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Ex: Preto Metalizado"
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Bloco 4: Galeria de Fotografias (Mínimo recomendado: 6 fotos) */}
            <div className="bg-slate-50/70 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    4. Galeria de Fotografias do Automóvel
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {uploadedPhotos.length >= 6 ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      <Check className="w-3.5 h-3.5" />
                      {uploadedPhotos.length} fotos prontas (Mínimo de 6 atingido!)
                    </span>
                  ) : uploadedPhotos.length > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {uploadedPhotos.length} de 6 fotos recomendadas (Faltam {6 - uploadedPhotos.length})
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      Mínimo recomendado: <strong>6 fotos</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Hidden Native File Input with MULTIPLE allowed for browsing computer folders */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Status / Advice Box */}
              {uploadedPhotos.length < 6 && (
                <div className="mb-3 p-2.5 bg-blue-50/80 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-2">
                  <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Dica para vendas rápidas no Guimarães Dakar:</span>
                    <span className="text-slate-600 dark:text-slate-400">
                      Recomendamos <strong>pelo menos 6 fotos</strong> de ângulos diferentes: 1) Frente em ângulo, 2) Traseira, 3) Lateral, 4) Interior / Bancos, 5) Painel / Quadrante de Km e 6) Bagageira / Jantes.
                    </span>
                  </div>
                </div>
              )}

              {/* Gallery Grid (if photos are uploaded) */}
              {uploadedPhotos.length > 0 ? (
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {uploadedPhotos.map((photo, index) => {
                      const isCover = index === 0;
                      return (
                        <div
                          key={photo.id}
                          className={`group relative aspect-[4/3] rounded-lg overflow-hidden border-2 bg-slate-900 transition-all ${
                            isCover
                              ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                              : 'border-slate-300 dark:border-slate-700 hover:border-blue-400'
                          }`}
                        >
                          <img
                            src={photo.dataUrl}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Cover Badge or Action */}
                          <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                            {isCover ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                                <Star className="w-3 h-3 fill-current" />
                                Capa Principal
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                                #{index + 1}
                              </span>
                            )}
                          </div>

                          {/* Hover Overlay with Controls */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                            <div className="flex justify-end gap-1">
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(photo.id)}
                                className="p-1 rounded bg-red-600 text-white hover:bg-red-500 transition-colors cursor-pointer"
                                title="Eliminar foto"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between gap-1">
                              <div className="flex gap-0.5">
                                <button
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => handleMovePhoto(index, 'left')}
                                  className="p-1 rounded bg-white/80 hover:bg-white text-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-[10px]"
                                  title="Mover para a esquerda"
                                >
                                  <ChevronLeft className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={index === uploadedPhotos.length - 1}
                                  onClick={() => handleMovePhoto(index, 'right')}
                                  className="p-1 rounded bg-white/80 hover:bg-white text-slate-800 disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-[10px]"
                                  title="Mover para a direita"
                                >
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {!isCover && (
                                <button
                                  type="button"
                                  onClick={() => handleSetCoverPhoto(index)}
                                  className="px-1.5 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold cursor-pointer"
                                  title="Definir esta foto como imagem principal"
                                >
                                  Tornar Capa
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Quick Add More Tile in Grid */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessingFiles}
                      className="aspect-[4/3] rounded-lg border-2 border-dashed border-blue-400 dark:border-blue-600/70 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100/50 dark:hover:bg-blue-950/40 flex flex-col items-center justify-center p-2 text-center transition-colors cursor-pointer group"
                    >
                      <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform mb-1" />
                      <span className="text-xs font-bold text-blue-700 dark:text-blue-300 leading-tight">
                        + Adicionar Mais Fotos
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        da pasta do PC
                      </span>
                    </button>
                  </div>

                  {/* Bulk Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Selecionar mais fotos do computador</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleClearAllPhotos}
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remover todas as {uploadedPhotos.length} fotos</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Primary Dropzone / Click to Browse Folders */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-3 p-6 rounded-xl border-2 border-dashed border-blue-400 dark:border-blue-600/60 bg-white dark:bg-slate-900/60 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-all text-center cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-xs">
                    <FolderPlus className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Selecionar Fotos da Pasta do Computador
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-3">
                    Pode selecionar <strong>6 ou mais fotos de uma vez</strong> (mantenha a tecla <em>Ctrl</em> ou <em>Shift</em> pressionada para escolher várias fotografias da mesma pasta).
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Abrir Pastas do Computador (Seleção Múltipla)</span>
                  </button>
                </div>
              )}

              {isProcessingFiles && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-lg text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2 mb-3">
                  <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>A otimizar e carregar as fotos da sua pasta...</span>
                </div>
              )}

              {uploadError && (
                <p className="text-xs text-red-600 dark:text-red-400 mb-3 font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  {uploadError}
                </p>
              )}

              {/* Secondary Options: Stand Presets & URL */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700">
                <span className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  Ou adicione fotos oficiais do stand Guimarães Dakar à galeria:
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  {STOCK_IMAGE_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        // Add preset to gallery
                        setUploadedPhotos((prev) => [
                          ...prev,
                          {
                            id: `preset-${Date.now()}-${idx}`,
                            name: preset.label,
                            dataUrl: preset.url
                          }
                        ]);
                        setSelectedImage(preset.url);
                        setCustomImageUrl('');
                      }}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all cursor-pointer group"
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-1.5">
                        <span className="text-[10px] text-white font-medium line-clamp-1">
                          + {preset.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      type="url"
                      placeholder="Ou cole uma URL externa de imagem (opcional)"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                    />
                  </div>
                  {customImageUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        if (customImageUrl.trim()) {
                          setUploadedPhotos((prev) => [
                            ...prev,
                            {
                              id: `url-${Date.now()}`,
                              name: 'Imagem Web',
                              dataUrl: customImageUrl.trim()
                            }
                          ]);
                          setCustomImageUrl('');
                        }
                      }}
                      className="px-3 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors cursor-pointer shrink-0"
                    >
                      + Adicionar à Galeria
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bloco 5: Opcionais e Equipamentos */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                5. Equipamentos e Opcionais de Destaque
              </label>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {POPULAR_FEATURES.map((feat) => {
                  const active = selectedFeatures.includes(feat);
                  return (
                    <button
                      key={feat}
                      type="button"
                      onClick={() => toggleFeature(feat)}
                      className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        active
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}
                      {feat}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFeatureInput}
                  onChange={(e) => setCustomFeatureInput(e.target.value)}
                  placeholder="Adicionar outro opcional (ex: Bagageira elétrica, Som Harman Kardon)..."
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomFeature(e);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddCustomFeature}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* Bloco 6: Descrição Comercial e Histórico */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  6. Descrição Detalhada do Automóvel
                </label>
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gerar texto de venda automático</span>
                </button>
              </div>

              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                placeholder="Descreva o estado do carro, número de donos, revisões e condições de entrega..."
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publicar no Estoque do Stand</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
