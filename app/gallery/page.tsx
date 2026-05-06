import { CloudinaryGallery } from '@/components/cloudinary-gallery';

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">BlankSpace Gallery</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">All BlankSpace Images</h2>
          <p className="text-gray-600 mb-4">Images from the 'blankspace' folder in Cloudinary</p>
          <CloudinaryGallery folder="blankspace" />
        </section>
      </div>
    </div>
  );
}
