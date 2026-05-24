import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Autocomplete, Avatar, Typography } from '@truongdq01/ui';
import { useTokens } from '@truongdq01/headless';
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

const USERS = [
  {
    id: '1',
    name: 'Truong Dang',
    email: 'truong@example.com',
    avatar: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?u=3',
  },
  {
    id: '4',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?u=4',
  },
];

type UserRow = (typeof USERS)[number];

export default function AutocompleteScreen() {
  const t = useTokens();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

  const [asyncOptions, setAsyncOptions] = useState<string[]>([]);
  const [asyncLoading, setAsyncLoading] = useState(true);

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
      <DemoSection title="Basic" description="String options with search filtering.">
        <Autocomplete
          label="Country"
          placeholder="Type a country name…"
          options={COUNTRIES}
          value={selectedCountry}
          onChange={(value) =>
            setSelectedCountry(typeof value === 'string' ? value : null)
          }
          getOptionLabel={(option) => option}
          noResultsText="Không tìm thấy kết quả"
        />
        {selectedCountry ? (
          <Typography variant="body2" style={{ marginTop: t.spacing[2] }}>
            Selected:{' '}
            <Typography variant="body2" fontWeight="bold">
              {selectedCountry}
            </Typography>
          </Typography>
        ) : null}
      </DemoSection>

      <DemoSection title="Custom Options" description="Rich rows with avatar and email.">
        <Autocomplete
          label="Select User"
          placeholder="Search for a user…"
          options={USERS}
          value={selectedUser}
          onChange={(value) =>
            setSelectedUser(
              value && typeof value === 'object' && 'id' in value ? value : null,
            )
          }
          noResultsText="Không tìm thấy kết quả"
          getOptionLabel={(option) => option.name}
          renderOption={(option) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: t.spacing[3],
                paddingVertical: t.spacing[2],
              }}
            >
              <Avatar src={option.avatar} size="sm" />
              <View>
                <Typography variant="body1">{option.name}</Typography>
                <Typography variant="body2" color="secondary">
                  {option.email}
                </Typography>
              </View>
            </View>
          )}
        />
      </DemoSection>

      <DemoSection title="States" description="Disabled and async loading.">
        <Autocomplete label="Disabled" disabled options={COUNTRIES} value="Vietnam" />
        <View style={{ height: t.spacing[4] }} />
        <Autocomplete
          label="Loading (async)"
          options={asyncOptions}
          loading={asyncLoading}
          loadingText="Đang tải danh sách…"
          placeholder="Focus to see loading panel (~1.6s)"
          getOptionLabel={(option) => option}
          noResultsText="Không tìm thấy kết quả"
        />
      </DemoSection>
    </DemoPage>
  );
}
