NAME = file
OBJS = file.o

AS = nasm
ASFLAGS = -f elf32
CC = g++
CFLAGS := -m32 -z noexecstack -no-pie
CLIB := ucrt

# default target
all: $(NAME)

$(NAME): $(OBJS)
	$(CC) $(CFLAGS) -o $(NAME) $(OBJS)
%.o: %.S
	$(AS) $(ASFLAGS) -o $@ $<

clean:
	rm file.o $(NAME)
.PHONY: all clean
