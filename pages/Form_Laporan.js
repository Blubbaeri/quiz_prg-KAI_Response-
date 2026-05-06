import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { Picker } from '@react-native-picker/picker';

const FormLaporan = () => {
  const [nama, setNama] = useState('');
  const [idKereta, setIdKereta] = useState('');
  const [kategori, setKategori] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const handleKirim = async () => {

    if (
      nama.trim() === '' || 
      idKereta.trim() === '' ||
      kategori.trim() === ''
    ) {
      Alert.alert('Peringatan', 'Semua data harus diisi');
      return;
    }

    const { error } = await supabase
    .from('quiz_laporan')
    .insert([
      {
        nama: nama,
        kereta: idKereta,
        kategori: kategori,
        kendala: deskripsi,
      },
    ]);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    Alert.alert('Sukses', 'Laporan berhasil dikirim');

    setNama('');
    setIdKereta('');
    setKategori('');
    setDeskripsi('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Form Laporan</Text>

      <View style={styles.card}>

        <Text style={styles.label}>Nama Pelapor</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama"
          value={nama}
          onChangeText={setNama}
        />

        <Text style={styles.label}>ID Kereta</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh : Argo Bromo"
          value={idKereta}
          onChangeText={setIdKereta}
        />

      <Text style={styles.label}>Kategori Kendala</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={kategori}
            onValueChange={(itemValue) =>
              setKategori(itemValue)
            }
          >

            <Picker.Item
              label="Pilih Kategori"
              value=""
            />

            <Picker.Item
              label="Mesin"
              value="Mesin"
            />

            <Picker.Item
              label="Fasilitas"
              value="Fasilitas"
            />

          </Picker>
        </View>

        <Text style={styles.label}>Deskripsi Kendala</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Tulis deskripsi kendala..."
          multiline
          value={deskripsi}
          onChangeText={setDeskripsi}
        />

        <Text style={styles.counter}>
          {deskripsi.length}/20 karakter
        </Text>

        {deskripsi.length >= 20 && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#2E7D32' }]}
            onPress={handleKirim}
          >
            <Text style={styles.buttonText}>
              Kirim Laporan
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },

  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 12,
  },

  textArea: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
  },

  counter: {
    marginTop: 8,
    color: 'gray',
  },

  button: {
    backgroundColor: '#E65100',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },
});

export default FormLaporan;