#include <bitset>
#include <cstdint>
#include <iomanip>
#include <iostream>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <vector>

class Codec {
private:
    std::vector<char> m_Base64 = std::vector<char>{
                                                   'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                                                   'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                                                   '0','1','2','3','4','5','6','7','8','9','+','/'};
    std::unordered_map<char, int> m_Base64Reverse = { {'A',0},{'B',1},{'C',2},{'D',3},{'E',4},{'F',5},{'G',6},
                                                     {'H',7},{'I',8},{'J',9},{'K',10},{'L',11},{'M',12},{'N',13},{'O',14},{'P',15},{'Q',16},{'R',17},{'S',18},
                                                     {'T',19},{'U',20},{'V',21},{'W',22},{'X',23},{'Y',24},{'Z',25},{'a',26},{'b',27},{'c',28},{'d',29},{'e',30},
                                                     {'f',31},{'g',32},{'h',33},{'i',34},{'j',35},{'k',36},{'l',37},{'m',38},{'n',39},{'o',40},{'p',41},{'q',42},
                                                     {'r',43},{'s',44},{'t',45},{'u',46},{'v',47},{'w',48},{'x',49},{'y',50},{'z',51},{'0',52},{'1',53},{'2',54},
                                                     {'3',55},{'4',56},{'5',57},{'6',58},{'7',59},{'8',60},{'9',61},{'+',62},{'/',63} };
    char m_Padding = '=';
public:
    std::string encode(const std::string& str) {
        int left = 0;
        int right = 3;
        std::string encodedString = "";
        while (left < str.length()) {
            if (right > str.length()) {
                right = str.length();
                int charsToProcess = right - left;
                if (charsToProcess == 1) {
                    std::bitset<12> bits;
                    int32_t ascii = str[left];
                    bits |= ascii;
                    bits <<= 4;
                    unsigned long num = bits.to_ulong();
                    std::ostringstream oss;
                    oss << std::oct << std::setfill('0') << num;
                    std::string octal = oss.str();
                    for (int i = 0; i < octal.size(); i += 2) {
                        std::string oct = octal.substr(i, 2);
                        int decimalFromOct;
                        std::istringstream(oct) >> std::oct >> decimalFromOct;
                        encodedString.push_back(m_Base64[decimalFromOct]);
                    }
                }
                else if (charsToProcess == 2) {
                    right = str.length();
                    std::bitset<18> bits;
                    for (int i = left; i < right; i++) {
                        int32_t ascii = str[i];
                        bits <<= 8;
                        bits |= ascii;
                    }
                    bits <<= 2;
                    unsigned long num = bits.to_ulong();
                    std::ostringstream oss;
                    oss << std::oct << std::setfill('0') << num;
                    std::string octal = oss.str();
                    for (int i = 0; i < octal.size(); i += 2) {
                        std::string oct = octal.substr(i, 2);
                        int decimalFromOct;
                        std::istringstream(oct) >> std::oct >> decimalFromOct;
                        encodedString.push_back(m_Base64[decimalFromOct]);
                    }
                }
                else {
                    std::cerr << "More chars to process than expected..." << std::endl;
                }
                for (int i = charsToProcess; i < 3; i++) {
                    encodedString.push_back(m_Padding);
                }
            }
            else {
                std::bitset<24> bits;
                for (int i = left; i < right; i++) {
                    int32_t ascii = str[i];
                    bits <<= 8;
                    bits |= ascii;
                }
                unsigned long num = bits.to_ulong();
                std::ostringstream oss;
                oss << std::oct << std::setfill('0') << num;
                std::string octal = oss.str();
                for (int i = 0; i < octal.size(); i += 2) {
                    std::string oct = octal.substr(i, 2);
                    int decimalFromOct;
                    std::istringstream(oct) >> std::oct >> decimalFromOct;
                    encodedString.push_back(m_Base64[decimalFromOct]);
                }
            }
            left += 3;
            right += 3;
        }
        return encodedString;
    }

    // Encodes a list of strings to a single string.
    std::string encode(std::vector<std::string>& strs) {
        std::string encoding = ",";
        for (int i = 0; i < strs.size(); i++) {
            encoding += encode(strs[i]) + ",";
        }
        return encoding;
    }

    // Decodes a single string to a list of strings.
    std::vector<std::string> decode(std::string s) {
        std::vector<std::string> vec;
        std::string buildingString = "";
        for (int i = 1; i < s.length();) {
            if (s[i] == ',') {
                vec.push_back(buildingString);
                buildingString = "";
                i++;
                continue;
            }
            if (s[i + 2] == '=') {
                // get the next 2-character substring
                int j = i + 2;
                std::bitset<12> bits;
                for (; i < j; i++) {
                    bits <<= 6;
                    bits |= m_Base64Reverse[s[i]];
                }
                i += 2;
                bits >>= 4; // drop the last four padding bits
                std::stack<char> chars;
                while (bits != 0) {
                    uint8_t lowerBits = bits.to_ulong() & 0xFF;
                    chars.push(char(lowerBits));
                    bits >>= 8;
                }
                while (!chars.empty()) {
                    buildingString.push_back(chars.top());
                    chars.pop();
                }
            }
            else if (s[i + 3] == '=') {
                // get the next 3-character substring
                int j = i + 3;
                std::bitset<18> bits;
                for (; i < j; i++) {
                    bits <<= 6;
                    bits |= m_Base64Reverse[s[i]];
                }
                i++;
                bits >>= 2; // drop the last two padding bits
                std::stack<char> chars;
                while (bits != 0) {
                    uint8_t lowerBits = bits.to_ulong() & 0xFF;
                    chars.push(char(lowerBits));
                    bits >>= 8;
                }
                while (!chars.empty()) {
                    buildingString.push_back(chars.top());
                    chars.pop();
                }
            }
            else {
                // get the next 4-character substring
                int j = i + 4;
                std::bitset<24> bits;
                for (; i < j; i++) {
                    bits <<= 6;
                    bits |= m_Base64Reverse[s[i]];
                }
                std::stack<char> chars;
                while (bits != 0) {
                    uint8_t lowerBits = bits.to_ulong() & 0xFF;
                    chars.push(char(lowerBits));
                    bits >>= 8;
                }
                while (!chars.empty()) {
                    buildingString.push_back(chars.top());
                    chars.pop();
                }
            }
        }
        return vec;
    }
};

int main()
{
    Codec codec;
    std::string encoded = codec.encode("Hello World!");
    std::cout << encoded << std::endl;
    std::vector<std::string> stringToEncode = {"Hello","World"};
    encoded = codec.encode(stringToEncode);
    std::cout << encoded << std::endl;
    std::vector<std::string> decoded = codec.decode(encoded);
    for (int i = 0; i < decoded.size(); i++) {
        std::cout << decoded[i] << std::endl;
    }
    return 0;
}
