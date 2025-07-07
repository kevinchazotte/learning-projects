import numpy as np

def dilate_array(arr, kernel_size=1):
    n = len(arr)
    result = np.zeros_like(arr)
    for i in range(n):
        start = max(0, i - kernel_size)
        end = min(n, i + kernel_size + 1)
        window = arr[start:end]
        result[i] = 1.0 if np.any(window == 1) else 0.0
    return result

def erode_array(arr, kernel_size=1):
    n = len(arr)
    result = np.zeros_like(arr)
    for i in range(n):
        start = max(0, i - kernel_size)
        end = min(n, i + kernel_size + 1)
        window = arr[start:end]
        result[i] = 1.0 if np.all(window == 1) else 0.0
    return result
