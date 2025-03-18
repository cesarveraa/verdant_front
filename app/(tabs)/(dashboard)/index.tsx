
// app/(tabs)/(dashboard)/index.tsx
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Dimensions, } from "react-native";

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
    style: {
        borderRadius: 16,
    },
};

export default function Dashboard() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Encabezado */}
              
                {/* Line Chart */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Daily Traffic</Text>
                    <LineChart
                        data={{
                            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                            datasets: [
                                {
                                    data: [20, 45, 28, 80, 99, 43, 50],
                                },
                            ],
                        }}
                        width={screenWidth - 40}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                    />
                </View>

                {/* Bar Chart */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>User Growth</Text>
                    <BarChart
                        data={{
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                            datasets: [
                                {
                                    data: [20, 45, 28, 80, 99, 43],
                                },
                            ],
                        }}
                        width={screenWidth - 40}
                        height={220}
                        chartConfig={chartConfig}
                        style={styles.chart}
                        yAxisLabel="" // Añade esto (etiqueta del eje Y)
                        yAxisSuffix="" // Añade esto (sufijo para valores del eje Y)
                    />
                </View>

                {/* Pie Chart */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Activity Distribution</Text>
                    <PieChart
                        data={[
                            {
                                name: "Crops",
                                population: 45,
                                color: "#2E7D32",
                                legendFontColor: "#7F7F7F",
                            },
                            {
                                name: "Livestock",
                                population: 28,
                                color: "#66BB6A",
                                legendFontColor: "#7F7F7F",
                            },
                            {
                                name: "Equipment",
                                population: 27,
                                color: "#81C784",
                                legendFontColor: "#7F7F7F",
                            },
                        ]}
                        width={screenWidth - 40}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        style={styles.chart}
                    />
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>2,451</Text>
                        <Text style={styles.statLabel}>Total Users</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>85%</Text>
                        <Text style={styles.statLabel}>Growth Rate</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>12.3K</Text>
                        <Text style={styles.statLabel}>Daily Views</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>98%</Text>
                        <Text style={styles.statLabel}>Satisfaction</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: "#2E7D32",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    subtitle: {
        fontSize: 16,
        color: "#FFFFFF",
        opacity: 0.8,
        marginTop: 4,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        margin: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        color: "#333333",
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5,
        marginBottom: 20,
    },
    statCard: {
        width: "45%",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        margin: 5,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2E7D32",
    },
    statLabel: {
        fontSize: 14,
        color: "#757575",
        marginTop: 4,
    },
});
