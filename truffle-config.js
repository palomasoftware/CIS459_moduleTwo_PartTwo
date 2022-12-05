module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "ec2-35-80-32-53.us-west-2.compute.amazonaws.com",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
}
