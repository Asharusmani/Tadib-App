import {
  Activity,
  BookOpen,
  Heart,
  MoreVertical,
  User,
} from "lucide-react-native";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomHeader from "../components/CustomHeader";

const GROUPS = [
  {
    id: "1",
    title: "University Friend",
    members: 6,
    days: 12,
    icon: <BookOpen size={24} color="#000000" />,
  },
  {
    id: "2",
    title: "Gym Buddies",
    members: 4,
    days: 8,
    icon: <User size={24} color="#000000" />,
  },
  {
    id: "3",
    title: "Morning Walk",
    members: 10,
    days: 25,
    icon: <Activity size={24} color="#000000" />,
  },
  {
    id: "4",
    title: "Family Health",
    members: 5,
    days: 15,
    icon: <Heart size={24} color="#000000" />,
    selected: true,
  },
  {
    id: "5",
    title: "Study Circle",
    members: 8,
    days: 5,
    icon: <BookOpen size={24} color="#000000" />,
  },
];

const GroupCard = ({ item }) => (
  <View style={[styles.card, item.selected && styles.selectedCard]}>
    <TouchableOpacity style={styles.moreOptions} activeOpacity={0.6}>
      <MoreVertical size={18} color="#9CA3AF" />
    </TouchableOpacity>

    <View>
      <View style={styles.avatarContainer}>
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
            style={[
              styles.avatar,
              { marginLeft: i === 1 ? 0 : -10, backgroundColor: "#E5E7EB" },
            ]}
          />
        ))}
        <View style={styles.moreAvatar}>
          <Text style={styles.moreText}>+2</Text>
        </View>
      </View>
      <Text style={styles.groupTitle}>{item.title}</Text>
      <View style={styles.statsRow}>
        <Text style={styles.statsText}>{item.members} Member</Text>
        <Text style={styles.statsText}>🔥 {item.days} days</Text>
      </View>
    </View>

    <View style={styles.mainIconWrapper}>
      <View style={styles.circleIcon}>{item.icon}</View>
    </View>
  </View>
);

export default function GroupScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Reusable Header in use */}
      <CustomHeader
        title="Group"
        showBack={true}
        showPlus={true}
        onPlusPress={() => console.log("Add Group clicked")}
      />

      <FlatList
        data={GROUPS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GroupCard item={item} />}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomNav}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  listPadding: { paddingHorizontal: 20, paddingBottom: 120, paddingTop: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    borderWidth: 2,
    borderColor: "transparent",
    position: "relative",
  },
  selectedCard: { borderColor: "#0E7A3110", backgroundColor: "#F0FDF4" },
  moreOptions: { position: "absolute", top: 15, right: 12, zIndex: 1 },
  avatarContainer: { flexDirection: "row", marginBottom: 10 },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#fff",
  },
  moreAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    marginLeft: -10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  moreText: { fontSize: 11, color: "#6B7280", fontWeight: "700" },
  groupTitle: { fontSize: 17, fontWeight: "700", color: "#111827" },
  statsRow: { flexDirection: "row", marginTop: 4 },
  statsText: { fontSize: 13, color: "#6B7280", marginRight: 12 },
  mainIconWrapper: { justifyContent: "center", alignItems: "center" },
  circleIcon: { backgroundColor: "#F0FDF4", padding: 10, borderRadius: 25 },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
});