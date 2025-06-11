cmake_minimum_required(VERSION 3.16)

project(encode-base-64 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(encode-base-64 main.cpp)

include(GNUInstallDirs)
install(TARGETS encode-base-64
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
)
