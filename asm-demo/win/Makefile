NAME = file.exe
OBJS = file.o

AS = "C:/Program Files (x86)/mingw32/bin/nasm"
ASFLAGS = -f win32
CC = "C:/Program Files (x86)/mingw32/bin/gcc"
CFLAGS := -m32
CLIB := ucrt

# default target
all: $(NAME)

$(NAME): $(OBJS)
	$(CC) -o $(NAME) $(OBJS) -lucrt
%.o: %.S
	$(AS) $(ASFLAGS) -o $@ $<

clean:
	del file.o $(NAME)
.PHONY: all clean
