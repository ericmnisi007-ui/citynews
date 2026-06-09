
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  uploadedImage: string | null;
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload = ({ uploadedImage, onImageUpload }: ImageUploadProps) => {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageUpload(result);
        toast({
          title: "Image uploaded",
          description: "Feature image has been uploaded successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Feature Image
      </label>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer transition-colors"
          >
            <Upload className="h-4 w-4" />
            Upload Image
          </label>
          <span className="text-gray-400 text-sm">
            Max size: 5MB. Supports JPG, PNG, WebP
          </span>
        </div>
        
        {uploadedImage && (
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Preview"
              className="w-full max-w-md h-48 object-cover rounded-lg border border-green-400/30"
            />
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <ImageIcon className="h-3 w-3" />
              Uploaded
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
