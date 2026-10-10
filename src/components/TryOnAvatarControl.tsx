import React, { useRef } from 'react';
import { AvatarProfile } from '../types';
import { Camera, Sparkles, User, Upload, Check, RefreshCw } from 'lucide-react';

interface TryOnAvatarControlProps {
  avatarProfile: AvatarProfile;
  onChangeAvatar: (updated: AvatarProfile) => void;
}

export const TryOnAvatarControl: React.FC<TryOnAvatarControlProps> = ({
  avatarProfile,
  onChangeAvatar,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onChangeAvatar({
        ...avatarProfile,
        photoUrl: reader.result as string,
        customPhotoName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleClearPhoto = () => {
    onChangeAvatar({
      ...avatarProfile,
      photoUrl: undefined,
      customPhotoName: undefined,
    });
  };

  return (
    <div className="w-full bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-stone-200 shadow-2xs mb-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-serif font-bold text-xs uppercase tracking-wide text-stone-900 flex items-center gap-1.5">
          <User className="w-4 h-4 text-[#B84A39]" />
          👤 THỬ TRÊN BẠN (TRY-ON MODEL)
        </span>

        {/* Upload Button */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          {avatarProfile.photoUrl ? (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Đã gán ảnh
              </span>
              <button
                type="button"
                onClick={handleClearPhoto}
                className="text-[11px] text-stone-400 hover:text-stone-700 underline cursor-pointer"
              >
                Gỡ ảnh
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors flex items-center gap-1 cursor-pointer border border-stone-200"
            >
              <Camera className="w-3.5 h-3.5 text-[#B84A39]" />
              <span>Tải ảnh của tôi</span>
            </button>
          )}
        </div>
      </div>

      {/* Avatar Options Selector */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {/* Gender / Persona */}
        <div>
          <label className="text-[10px] text-stone-400 uppercase font-mono block mb-1">
            Nhân vật
          </label>
          <div className="flex gap-1">
            {[
              { id: 'female', label: 'Nữ' },
              { id: 'male', label: 'Nam' },
              { id: 'neutral', label: 'Neutral' },
            ].map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() =>
                  onChangeAvatar({ ...avatarProfile, gender: g.id as any })
                }
                className={`flex-1 py-1 rounded-md text-[11px] font-medium border cursor-pointer transition-colors ${
                  avatarProfile.gender === g.id
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skin Tone */}
        <div>
          <label className="text-[10px] text-stone-400 uppercase font-mono block mb-1">
            Tông da
          </label>
          <div className="flex gap-1.5 items-center pt-0.5">
            {[
              { id: 'light', color: '#FDE5D4', label: 'Sáng' },
              { id: 'natural', color: '#E2B188', label: 'Tự nhiên' },
              { id: 'warm', color: '#C68B59', label: 'Ngăm' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() =>
                  onChangeAvatar({ ...avatarProfile, skinTone: st.id as any })
                }
                title={st.label}
                className={`w-6 h-6 rounded-full border transition-transform cursor-pointer ${
                  avatarProfile.skinTone === st.id
                    ? 'ring-2 ring-[#B84A39] scale-110'
                    : 'opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: st.color }}
              />
            ))}
          </div>
        </div>

        {/* Body Shape */}
        <div>
          <label className="text-[10px] text-stone-400 uppercase font-mono block mb-1">
            Dáng người
          </label>
          <div className="flex gap-1">
            {[
              { id: 'slim', label: 'Mảnh' },
              { id: 'regular', label: 'Cân đối' },
              { id: 'curvy', label: 'Phóng khoáng' },
            ].map((bs) => (
              <button
                key={bs.id}
                type="button"
                onClick={() =>
                  onChangeAvatar({ ...avatarProfile, bodyShape: bs.id as any })
                }
                className={`flex-1 py-1 rounded-md text-[10px] font-medium border truncate cursor-pointer transition-colors ${
                  avatarProfile.bodyShape === bs.id
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {bs.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
