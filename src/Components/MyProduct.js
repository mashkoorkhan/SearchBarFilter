import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

const MyProduct = () => {
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [search, setSearch] = useState('');
  const [ind, setInd] = useState(0)
  const [isModalVisible, setModalVisible] = useState(false);
  const scrollRef = useRef();

  console.log('Data', data);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(response => {
        setData(response);
        setOldData(response);
      });
  }, []);
  const onSearch = text => {
    if (text == '') {
      setData(oldData);
    } else {
      let templist = data.filter(item => {
        return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(templist);
    }
  };
  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            flexDirection: 'row',
            marginHorizontal: 10,
          }}>
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={txt => {
              setSearch(txt), onSearch(txt);
            }}
            style={{
              borderWidth: 0.5,
              width: '80%',
              borderRadius: 10,
              flex: 1,
              fontSize: 18,
              paddingLeft: 20,
            }}
          />
          <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/6488/6488674.png',
              }}
              style={{width: 40, height: 40, marginLeft: 5}}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          ref={scrollRef}
          initialScrollIndex={ind}
          scrollsToTop={true}
          renderItem={({item}) => (
            <>
              <Text style={{margin: 10, fontSize: 20}}>
                Title: {item.title}
              </Text>
              <Text style={{margin: 10, fontSize: 20}}>
                Price : ${item.price}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginLeft: 10, fontSize: 20}}>
                  Rating: {item.rating.rate}
                </Text>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/6201/6201789.png',
                  }}
                  style={{width: 20, height: 20, marginTop: 3, marginLeft: 10}}
                />
              </View>
              <Image
                source={{uri: item.image}}
                style={{
                  width: 300,
                  height: 400,
                  marginHorizontal: 20,
                  borderRadius: 10,
                }}
              />
            </>
          )}
          keyExtractor={item => item.key}
        />
      </View>

      <Modal
        style={{flex: 1, backgroundColor: 'green'}}
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}>
        {/* <TouchableOpacity style={{flex:1}}> */}
        <View style={{flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                height: 200,
                width: 300,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <TouchableOpacity onPress={() => {
                let templist = data.sort((a,b)=>
                  a.title > b.title ? 1 : -1
                )
                setData(templist)
                scrollRef.current?.scrollToIndex({
                  index: 0,
                  animated: true,
                });
                setModalVisible(false)
                
              }}>
                <Text style={{fontSize: 24}}>Sort By Name</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setData(data.sort((a,b)=>a.price-b.price))
                setModalVisible(false)
                scrollRef.current?.scrollToIndex({
                  index: 0,
                  animated: true,
                });
                }}>
                <Text style={{fontSize: 24}}>Low To High Price</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setData(data.sort((a,b)=>b.price-a.price))
                setModalVisible(false)
                scrollRef.current?.scrollToIndex({
                  index: 0,
                  animated: true,
                });
              }}>
                <Text style={{fontSize: 24}}>High To Low Price</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setData(data.sort((a,b)=>b.rating.rate-a.rating.rate))
                setModalVisible(false)
                scrollRef.current?.scrollToIndex({
                  index: 0,
                  animated: true,
                });
                }}>
                <Text style={{fontSize: 24}}>Sort By Rating</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </TouchableOpacity> */}
      </Modal>
    </>
  );
};

export default MyProduct;

const styles = StyleSheet.create({});
