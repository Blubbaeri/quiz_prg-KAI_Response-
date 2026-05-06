import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { supabase } from '../lib/supabase';

const ListRiwayat = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const { data: laporan, error } = await supabase
      .from('quiz_laporan')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error.message);
    } else {
      setData(laporan || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.nama}>{item.nama}</Text>
          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  item.kategori === 'Mesin'
                    ? '#E53935'
                    : '#1E88E5',
              },
            ]}
          >
            <Text style={styles.badgeText}>{item.kategori}</Text>
          </View>
        </View>

        <Text style={styles.text}>ID Kereta : {item.kereta}</Text>
        <Text style={styles.deskripsi}>{item.kendala}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000ff" />
        <Text style={{ marginTop: 10 }}>Memuat data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Riwayat Laporan</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Cari nama pelapor..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}

        onRefresh={fetchData}
        refreshing={loading}

        ListEmptyComponent={
          <Text style={styles.emptyText}>Tidak ada laporan ditemukan</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nama: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    marginTop: 10,
    color: '#555',
  },
  deskripsi: {
    marginTop: 8,
    color: '#666',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
    fontSize: 16,
  },
});

export default ListRiwayat;