import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@/components/ui/image-list';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const IMAGES: { id: number; title: string; author: string; span?: number }[] = [
  { id: 1, title: 'Mountain Lake', author: 'nature_lover', span: 2 },
  { id: 2, title: 'City Lights', author: 'urban_explorer' },
  { id: 3, title: 'Desert Sands', author: 'wanderlust' },
  { id: 4, title: 'Forest Trail', author: 'hiker_joe', span: 2 },
  { id: 5, title: 'Ocean Waves', author: 'surfer_girl' },
  { id: 6, title: 'Snowy Peak', author: 'alpha_ski' },
];

export default function ImageListScreen() {
  return (
    <DemoPage
      title="ImageList"
      description="Optimized image grids — standard, wide, and staggered layouts."
    >
      <DemoSection
        title="Standard"
        description="Two columns with title bars."
        flush
      >
        <ImageList cols={2} gap={8}>
          {IMAGES.map((item) => (
            <ImageListItem key={item.id}>
              <Image
                source={{
                  uri: `https://picsum.photos/400/400?random=${item.id}`,
                }}
                rounded="none"
                className="h-full w-full"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={`by @${item.author}`}
                actionIcon={<Icon name="heart" size="md" color="#ffffff" />}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DemoSection>

      <DemoSection
        title="Wide spans"
        description="Feature tiles spanning multiple columns."
        flush
      >
        <ImageList cols={3} gap={4}>
          {IMAGES.map((item) => (
            <ImageListItem key={item.id} span={item.span ?? 1}>
              <Image
                source={{
                  uri: `https://picsum.photos/400/400?random=${item.id + 10}`,
                }}
                rounded="none"
                className="h-full w-full"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DemoSection>

      <DemoSection
        title="Portrait"
        description="Staggered portrait tiles."
        flush
      >
        <ImageList cols={2} gap={12}>
          {IMAGES.slice(0, 4).map((item) => (
            <ImageListItem key={item.id} aspectRatio={3 / 4}>
              <Image
                source={{
                  uri: `https://picsum.photos/400/600?random=${item.id + 20}`,
                }}
                rounded="none"
                className="h-full w-full"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </DemoSection>
    </DemoPage>
  );
}
