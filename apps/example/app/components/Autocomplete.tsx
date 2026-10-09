import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Autocomplete } from '@/components/ui/autocomplete';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const COUNTRIES = [
  'Vietnam',
  'United States',
  'Japan',
  'South Korea',
  'Germany',
  'France',
  'United Kingdom',
  'Canada',
  'Australia',
  'Brazil',
];

const USER_NAMES = ['Truong Dang', 'John Doe', 'Jane Smith', 'Alex Johnson'];

export default function AutocompleteScreen() {
  const [country, setCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [user, setUser] = useState('');

  const [asyncOptions, setAsyncOptions] = useState<string[]>([]);
  const [asyncLoading, setAsyncLoading] = useState(true);
  const [asyncQuery, setAsyncQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setAsyncLoading(true);
    setAsyncOptions([]);
    const timeoutId = setTimeout(() => {
      if (!cancelled) {
        setAsyncOptions(COUNTRIES);
        setAsyncLoading(false);
      }
    }, 1600);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <DemoPage
      title="Autocomplete"
      description="Text input enhanced by a panel of suggested options."
    >
      <DemoSection
        title="Basic"
        description="String options with search filtering."
      >
        <Autocomplete
          placeholder="Type a country name…"
          options={COUNTRIES}
          value={country}
          onChange={setCountry}
          onSelect={setSelectedCountry}
          emptyText="Không tìm thấy kết quả"
        />
        {selectedCountry ? (
          <Text variant="p" style={{ marginTop: 8 }}>
            Selected: <Text className="font-semibold">{selectedCountry}</Text>
          </Text>
        ) : null}
      </DemoSection>

      <DemoSection
        title="User search"
        description="Search a directory of names."
      >
        <Autocomplete
          placeholder="Search for a user…"
          options={USER_NAMES}
          value={user}
          onChange={setUser}
          emptyText="Không tìm thấy kết quả"
        />
      </DemoSection>

      <DemoSection title="States" description="Disabled and async loading.">
        <Autocomplete
          inputProps={{ disabled: true }}
          options={COUNTRIES}
          value="Vietnam"
          placeholder="Disabled"
        />
        <View style={{ height: 16 }} />
        <Autocomplete
          options={asyncOptions}
          value={asyncQuery}
          onChange={setAsyncQuery}
          emptyText={
            asyncLoading ? 'Đang tải danh sách…' : 'Không tìm thấy kết quả'
          }
          placeholder="Focus and type — options load in ~1.6s"
        />
      </DemoSection>
    </DemoPage>
  );
}
