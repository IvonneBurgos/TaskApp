import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { User } from '../../domain/entities';
import useUser from '../hooks/useUsers';

const ListScreen = () => {
  const { users, loading } = useUser()

  if (loading) {
    return (
      <View testID="loader" style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderUserList = ({item} : {item: User})=>{
    return (
        <View style={styles.listItem}>
            <Image source={{ uri: `https://picsum.photos/200/300` + '?v=' + item.id }} style={styles.image} />
            <Text>{item.name}</Text>
          </View>
    )
  }

  return (
    <View testID="userList" style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item : User) => item.id}
        viewabilityConfig={{waitForInteraction: true, viewAreaCoveragePercentThreshold: 50}}
        renderItem={renderUserList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: 40,
    height: 40,
    margin: 8,
    borderRadius: 40
  },
});

export default ListScreen;
