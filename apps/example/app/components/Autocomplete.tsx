import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Autocomplete, Typography, Avatar } from '@truongdq01/ui';
import { DemoPage, DemoSection } from './_shared/DemoPage';

const COUNTRIES = [
  'Vietnam', 'United States', 'Japan', 'South Korea', 'Germany',
  'France', 'United Kingdom', 'Canada', 'Australia', 'Brazil',
];

const USERS = [
  { id: '1', name: 'Truong Dang', email: 'truong@example.com', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'John Doe', email: 'john@example.com', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Alex Johnson', email: 'alex@example.com', avatar: 'https://i.pravatar.cc/150?u=4' },
];

type UserRow = (typeof USERS)[number];

export default function AutocompleteScreen() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);

  const [asyncOptions, setAsyncOptions] = useState<string[]>([]);
  const [asyncLoading, setAsyncLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setAsyncLoading(true);
    setAsyncOptions([]);
    const t = setTimeout(() => {
      if (!cancelled) {
        setAsyncOptions(COUNTRIES);
        setAsyncLoading(false);
      }
    }, 1600);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return (
    <DemoPage
      title="Autocomplete"
      description="A normal text input enhanced by a panel of suggested options."
    >
      <DemoSection title="Basic Autocomplete">
        <Autocomplete
          label="Country"
          placeholder="Type a country name..."
          options={COUNTRIES}
          value={selectedCountry}
          onChange={setSelectedCountry}
          getOptionLabel={(option) => option}
          noResultsText="Không tìm thấy kết quả"
        />
        {selectedCountry && (
          <Typography variant="body2" style={{ marginTop: 8 }}>
            Selected: <Typography variant="body2" fontWeight="bold">{selectedCountry}</Typography>
          </Typography>
        )}
      </DemoSection>

      <DemoSection title="Custom Options">
        <Autocomplete
          label="Select User"
          placeholder="Search for a user..."
          options={USERS}
          value={selectedUser}
          onChange={setSelectedUser}
          noResultsText="Không tìm thấy kết quả"
          getOptionLabel={(option) => option.name}
          renderOption={(option) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 }}>
              <Avatar src={option.avatar} size="sm" />
              <View>
                <Typography variant="body1">{option.name}</Typography>
                <Typography variant="body2" color="secondary">{option.email}</Typography>
              </View>
            </View>
          )}
        />
      </DemoSection>

      <DemoSection title="States">
        <Autocomplete
          label="Disabled Autocomplete"
          disabled
          options={COUNTRIES}
          value="Vietnam"
        />
        <View style={{ height: 16 }} />
        <Autocomplete
          label="Loading (async options)"
          options={asyncOptions}
          loading={asyncLoading}
          loadingText="Đang tải danh sách…"
          placeholder="Focus để xem panel đang tải, sau ~1.6s có dữ liệu"
          getOptionLabel={(option) => option}
          noResultsText="Không tìm thấy kết quả"
        />
      </DemoSection>
    </DemoPage>
  );
}
